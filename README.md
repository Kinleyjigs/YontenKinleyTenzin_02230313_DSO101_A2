# DSO101 Assignment 2: Jenkins CI/CD Pipeline Implementation

##  Objective
This assignment configures a Jenkins CI/CD pipeline for the to-do list application from Assignment 1.

The pipeline automates:
1. Source checkout from GitHub
2. Dependency installation
3. Build steps
4. Unit testing
5. Docker image build and push

## Repository
GitHub repository:
https://github.com/Kinleyjigs/YontenKinleyTenzin_02230313_DSO101_A2

Docker Hub repository:
https://hub.docker.com/r/yonten1234567890/todo-app

## Tech Stack
1. Jenkins
2. GitHub
3. Node.js and npm
4. Jest and jest-junit
5. Docker and Docker Hub
6. React (frontend)
7. Express and PostgreSQL (backend)

## How to Run Locally 
### Backend
```bash
cd backend
npm install
npm test
npm start
```

### Frontend
```bash
cd frontend
npm install
npm test -- --watchAll=false
npm run build
npm start
```

## Jenkins Configuration Summary
1. Jenkins installed and running on localhost:8080
2. Required plugins installed:
- NodeJS Plugin
- Pipeline
- GitHub Integration
- Docker Pipeline
3. NodeJS tool configured in Jenkins Tools:
- Name: NodeJS
- Version: Node 20 LTS
- Install automatically: enabled
4. Credentials configured in Jenkins:
- github-pat (GitHub username + PAT)
- docker-hub-creds (Docker Hub username + token)
5. Pipeline job configured from SCM:
- SCM: Git
- Branch: main
- Script path: Jenkinsfile

## What I Did in This Assignment
This project required the development of an entire CI/CD pipeline from beginning to end.

1. Environment Creation: I installed and set up Jenkins on our local machines as the build server.
2. Plugin Installation: Added the required plugins for Jenkins that included NodeJS, Pipeline, GitHub, and Docker.
3. Credential Creation: configured our GitHub PAT (Personal Access Token) and Docker Hub credentials in Jenkins for secure authentication.
4. Pipeline Creation: A multi-stage Jenkinsfile was created to automate the build/test/deploy process.
5. Testing: Jest-based testing was implemented for both the frontend (React) and backend (Express API).
6. Containerization: built Docker images for both frontend and backend services.
7. Registry Push: I have pushed Docker images to the Docker Hub registry with appropriate tags.
8. Debugging:debugged 5 significant pipeline issues and provided iterative fixes.
9. Documentation: captured evidence of the successful run with numerous screenshots.

## Pipeline Stages Implemented
1. Checkout: Clone code from GitHub repository
2. Backend: Install Dependencies - Install npm packages for Express API
3. Frontend: Install Dependencies - Install npm packages for React app
4. Backend: Build - Check backend build readiness
5. Frontend: Build - Compile React app for production
6. Backend: Test - Run Jest tests for backend API
7. Frontend: Test - Run Jest tests for frontend components
8. Build Docker Images: Create Docker images for both services
9. Push to Docker Hub: Upload images to Docker Hub registry
10. Deploy with Docker Compose: Deploy services using docker-compose



## Final Outcome
1. Jenkins pipeline run completed successfully
2. Frontend and backend tests executed
3. Docker images built successfully
4. Docker images pushed to Docker Hub:
- yonten1234567890/todo-app:backend-latest
- yonten1234567890/todo-app:frontend-latest

## Screenshot Evidence
### 1) Installed Jenkins Plugins
This screenshot proves required plugins were installed before pipeline configuration.

![Installed Jenkins plugins](frontend/public/01_jenkins_plugins_installed.png)

### 2) NodeJS Tool Configuration
This screenshot shows NodeJS tool setup used by Jenkins pipeline (`tools { nodejs 'NodeJS' }`).

![NodeJS tool configuration](frontend/public/02_jenkins_nodejs_tool_config.png)

### 3) GitHub Credential in Jenkins
This screenshot confirms GitHub PAT credential exists in Jenkins (secret hidden).

![GitHub credential](frontend/public/03_jenkins_github_credential.png)

### 4) Docker Hub Credential in Jenkins
This screenshot confirms Docker Hub credential (`docker-hub-creds`) exists for image push.

![Docker Hub credential](frontend/public/04_jenkins_docker_credential.png)

### 5) Pipeline Job Configuration
This screenshot shows pipeline is configured from SCM with correct repository and Jenkinsfile path.

![Pipeline job configuration](frontend/public/05_pipeline_job_configuration.png)

### 6) Pipeline Stage View (Success)
This screenshot shows the completed run with successful stages.

![Pipeline stage success](frontend/public/07_pipeline_stage_view_success.png)

### 7) Console Evidence (Split into 5 Screenshots)
The following screenshots capture each major success point in console output.

#### 7.1 Backend Test Success
Shows backend test stage execution and pass status.

![Backend test success](frontend/public/08_pipeline_console_success_backend.png)

#### 7.2 Frontend Test Success
Shows frontend test stage execution with `PASS src/App.test.js`.

![Frontend test success](frontend/public/08_pipeline_console_success_frontend.png)

#### 7.3 Docker Build Success
Shows Docker image build completion for backend and frontend.

![Docker build success](frontend/public/08_pipeline_console_success_BuildDocker.png)

#### 7.4 Docker Hub Push Success
Shows successful `docker push` for `backend-latest` and `frontend-latest` tags.

![Docker Hub push success](frontend/public/08_pipeline_console_success_dockerHub.png)

#### 7.5 Final Pipeline Success
Shows final successful build completion (`Finished: SUCCESS`).

![Final pipeline success](frontend/public/08_pipeline_console_success.png)

### 8) Jenkins Test Dashboard
This screenshot is the Jenkins test dashboard page. In this Jenkins UI theme, the menu label is `Tests` (same as Test Results).

![Jenkins tests dashboard](frontend/public/09_jenkins_test_results.png)

### 9) Docker Hub Image Tags
This screenshot shows both pushed tags in Docker Hub repository.

![Docker Hub images](frontend/public/10_dockerhub_images.png)


## Challenges Faced & Solutions 
This assignment required multiple iterations and troubleshooting. The five failed builds below were captured as evidence and then fixed step by step.

### Challenge 1: Backend Build Script Missing (Build #3)
![Challenge 1 evidence](frontend/public/11_challenge_backend_build_missing_script.png)

**Problem**: The backend build stage failed because Jenkins tried to run `npm run build` and the backend package did not contain a build script.The main cause of this problem is the backend application is an API server, so a build script was not defined in `backend/package.json`.

**Solution**: Updated the Jenkinsfile to check whether a build script exists before running the backend build step.

**Result**: The pipeline now skips the backend build stage safely when no build script is present.




### Challenge 2: Backend Tests Not Found (Build #4)

![Challenge 2 evidence](frontend/public/12_challenge_backend_no_tests_found.png)

**Problem**: The backend test stage failed with `No tests found, exiting with code 1`. This happened because the backend test file had not been committed to Git at that point, so Jenkins checked out a commit without tests.

**Solution**: Added and committed `backend/__tests__/server.test.js` to the repository.

**Result**: Backend Jest tests now run in Jenkins and produce JUnit output.


### Challenge 3: Frontend CRA Reporter Incompatibility (Build #5)

![Challenge 3 evidence](frontend/public/13_challenge_frontend_cra_reporters.png)

**Problem**: The frontend test stage failed with the CRA error about unsupported Jest options.i found out that Create React App does not allow overriding the Jest `reporters` setting without ejecting.

**Solution**:So i have Removed the unsupported reporters flags from the frontend test command.

**Result**: Frontend tests now pass in Jenkins with a CRA-compatible command.

### Challenge 4: Frontend Tests Not Found (Build #6)

![Challenge 4 evidence](frontend/public/14_challenge_frontend_no_tests_found.png)

**Problem**: The frontend test stage failed with `No tests found, exiting with code 1`.The main cause of this problem is that the frontend test file was not tracked in Git during that build, so Jenkins had no test file to execute.

**Solution**: I Added `frontend/src/App.test.js` and committed it so the pipeline can detect the test.

**Result**: Frontend Jest tests now execute successfully in Jenkins.

### Challenge 5: Backend Port Conflict During Tests (Build #8)
![Challenge 5 evidence](frontend/public/15_challenge_backend_port_conflict.png)

**Problem**: The backend test stage crashed with `Error: listen EADDRINUSE: address already in use :::5000`.This problem arises because `backend/server.js` was starting the Express server when imported by Jest, which tried to bind port 5000 twice.

**Solution**: So I have Wrapped the server startup in a `require.main === module` guard so tests can import the app without opening the port.

**Result**: Backend tests now run without any port binding conflict.

## Conclusion
In this assignment I have created a complete Jenkins CI/CD pipeline for a full-stack to-do app and showed how it can be built and debugged using an example of this kind of application.

To do this, I have set up Jenkins, installed necessary plugins, connected GitHub and Docker Hub accounts, and built a multi-stage pipeline that automates code checkout and installation of dependencies, as well as all of the build steps, testing, creating a Docker image, and publishing the image.

The first attempt at executing my pipeline did not succeed; however, I made use of failure’s report from Jenkins console output in order to learn from my mistakes. Each problem identified from the console output was corrected at its source and then tested again by running the pipeline until all steps within the pipeline had finished successfully.
As a result, I now have a working CI/CD process, along with supporting screenshots and an accurate record of my troubleshooting efforts throughout the process.
