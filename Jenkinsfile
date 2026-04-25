pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'
    }
    
    environment {
        IMAGE_NAME = "yonten1234567890/todo-app"
        PATH = "/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '========== Checkout Code =========='
                checkout scm
                sh 'echo "Repository checked out successfully"'
            }
        }
        
        stage('Backend - Install Dependencies') {
            steps {
                echo '========== Backend: Installing Dependencies =========='
                dir('backend') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Frontend - Install Dependencies') {
            steps {
                echo '========== Frontend: Installing Dependencies =========='
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Backend - Build') {
            steps {
                echo '========== Backend: Build Stage =========='
                dir('backend') {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Frontend - Build') {
            steps {
                echo '========== Frontend: Build Stage (React) =========='
                dir('frontend') {
                    sh 'npm run build'
                    sh 'echo "Frontend built successfully"'
                }
            }
        }
        
        stage('Backend - Test') {
            steps {
                echo '========== Backend: Testing =========='
                dir('backend') {
                    sh 'npm test'
                }
            }
            post {
                always {
                    dir('backend') {
                        junit testResults: '**/junit.xml'
                    }
                }
            }
        }
        
        stage('Frontend - Test') {
            steps {
                echo '========== Frontend: Testing =========='
                dir('frontend') {
                    sh 'CI=true npm test -- --watchAll=false'
                }
            }
            post {
                always {
                    dir('frontend') {
                        junit allowEmptyResults: true, testResults: '**/junit.xml'
                    }
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                echo '========== Building Docker Images =========='
                sh '''
                    docker build -f backend/Dockerfile -t ${IMAGE_NAME}:backend-latest ./backend
                    docker build -f frontend/Dockerfile -t ${IMAGE_NAME}:frontend-latest ./frontend
                    echo "Docker images built successfully"
                '''
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                echo '========== Pushing to Docker Hub =========='
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "${DOCKER_PASS}" | docker login -u "${DOCKER_USER}" --password-stdin
                        docker push ${IMAGE_NAME}:backend-latest
                        docker push ${IMAGE_NAME}:frontend-latest
                        docker logout
                        echo "Images pushed successfully to Docker Hub"
                    '''
                }
            }
        }
        
        stage('Deploy with Docker Compose') {
            when {
                branch 'main'
            }
            steps {
                echo '========== Deploying with Docker Compose =========='
                sh '''
                    docker-compose down || true
                    docker-compose up -d
                    echo "Application deployed with Docker Compose"
                '''
            }
        }
        
        // Uncomment if deploying to Render
        /*
        stage('Deploy to Render') {
            when {
                branch 'main'
            }
            steps {
                echo '========== Deploying to Render =========='
                sh '''
                    curl -X POST https://api.render.com/deploy/srv-${RENDER_SERVICE_ID} \
                        -H "Authorization: Bearer ${RENDER_API_KEY}"
                    echo "Deployment to Render initiated"
                '''
            }
        }
        */
    }
    
    post {
        success {
            echo '✓ Pipeline executed successfully'
        }
        failure {
            echo '✗ Pipeline failed. Check logs above for details'
        }
    }
}