# YontenKinleyTenzin_02230313_DSO101_A2

## Jenkins CI/CD Pipeline Setup Guide

### Project Overview
- **Frontend**: React.js application with testing support
- **Backend**: Express.js API server
- **Database**: PostgreSQL database
- **CI/CD**: Jenkins with Docker containerization

---

## Prerequisites Completed
✅ Jenkins installed and running on localhost:8080
✅ Required plugins installed:
  - NodeJS Plugin
  - Pipeline
  - GitHub Integration
  - Docker Pipeline
✅ GitHub repo linked: https://github.com/yontenkinley/DSO_assign2
✅ Jenkinsfile added to repo

---

## STEP 1: Configure Jenkins Credentials

### 1.1 Docker Hub Credentials
1. In Jenkins: **Manage Jenkins > Credentials > System > Global credentials > Add Credentials**
2. Select: **Username with password**
3. Enter:
   - Username: `yonten1234567890` (your Docker Hub username)
   - Password: (your Docker Hub password/token)
   - ID: `docker-username`
   - ID: `docker-password`

### 1.2 GitHub Credentials
1. Go to GitHub > Settings > Developer Settings > Personal Access Tokens > Tokens (classic)
2. Generate new token with:
   - `repo` (full control)
   - `admin:repo_hook` (for webhooks)
3. Copy the token
4. In Jenkins: Add Credentials
   - Kind: **Username with password**
   - Username: `yontenkinley` (your GitHub username)
   - Password: (paste GitHub PAT)
   - ID: `github-pat`

### 1.3 Optional - Render API Credentials (for deployment)
1. Get your Render API key from https://dashboard.render.com/account/api-keys
2. In Jenkins: Add Credentials
   - Kind: **Secret text**
   - Secret: (paste Render API key)
   - ID: `render-api-key`

---

## STEP 2: Configure NodeJS Tool in Jenkins

1. **Manage Jenkins > Tools > NodeJS**
2. Click **Add NodeJS**
   - Name: `NodeJS`
   - Version: Select NodeJS LTS (v20.x recommended)
   - Check: "Automatically install"
3. Click **Save**

---

## STEP 3: Create Jenkins Pipeline Job

1. **New Item**
2. Name: `DSO_Assignment2_Pipeline`
3. Type: **Pipeline**
4. Configure:
   - **Definition**: Pipeline script from SCM
   - **SCM**: Git
   - **Repository URL**: `https://github.com/yontenkinley/DSO_assign2.git`
   - **Credentials**: Select your GitHub PAT
   - **Branch**: `*/main`
   - **Script Path**: `Jenkinsfile`

5. Click **Save**

---

## STEP 4: Run the Pipeline

1. Click **Build Now** on the pipeline job
2. Monitor the build in **Console Output**

Expected Output:
```
========== Checkout Code ==========
========== Backend: Installing Dependencies ==========
========== Frontend: Installing Dependencies ==========
========== Backend: Build Stage ==========
========== Frontend: Build Stage (React) ==========
========== Building Docker Images ==========
✓ Pipeline executed successfully
```

---

## STEP 5: Verify Build Artifacts

After successful build:

1. **Test Results**: Dashboard shows test summary
2. **Docker Images**: 
   ```bash
   docker images | grep todo-app
   ```
3. **Docker Hub**: Check your Docker Hub for:
   - `yonten1234567890/todo-app:backend-latest`
   - `yonten1234567890/todo-app:frontend-latest`

---

## STEP 6: Local Testing (Before Jenkins)

### Test Backend
```bash
cd backend
npm install
npm test
```

### Test Frontend
```bash
cd frontend
npm install
npm test -- --watchAll=false
```

### Run Locally
```bash
# Terminal 1: Backend
cd backend
npm install
npm start

# Terminal 2: Frontend
cd frontend
npm install
npm start

# Terminal 3: Database (if needed)
docker run -e POSTGRES_PASSWORD=yonten123 -p 5432:5432 postgres:15-alpine
```

---

## STEP 7: Docker Deployment

### Build Docker Images Locally
```bash
# Build Backend
docker build -f backend/Dockerfile -t yonten1234567890/todo-app:backend-latest ./backend

# Build Frontend
docker build -f frontend/Dockerfile -t yonten1234567890/todo-app:frontend-latest ./frontend
```

### Run with Docker Compose
```bash
docker-compose up -d
```

Access application:
- Frontend: http://localhost
- Backend API: http://localhost:5001
- Database: localhost:5432

---

## STEP 8: Optional - Render Deployment

### Option A: Create New Render Repo (RECOMMENDED)
1. Create new GitHub repository: `DSO_assign2_render`
2. Push docker-compose.yml and backend files
3. In Render.com:
   - Create new Web Service from GitHub
   - Point to `DSO_assign2_render` repo
   - Set environment variables
   - Deploy

### Option B: Use Assignment 1 Render Repo
- Update backend connection strings
- Deploy through existing service

### Enable Render Deployment in Jenkins (Optional)
Uncomment in Jenkinsfile, line ~120:
```groovy
stage('Deploy to Render') {
    when {
        branch 'main'
    }
    steps {
        echo '========== Deploying to Render =========='
        sh '''
            curl -X POST https://api.render.com/deploy/srv-${RENDER_SERVICE_ID} \
                -H "Authorization: Bearer ${RENDER_API_KEY}"
        '''
    }
}
```

Then add to Jenkins environment:
- `RENDER_API_KEY`: Your Render API key
- `RENDER_SERVICE_ID`: Your service ID from Render dashboard

---

## Troubleshooting

### Jenkins Errors

**Error: "npm: command not found"**
- Solution: Check NodeJS tool is configured in Manage Jenkins > Tools

**Error: "Docker daemon not accessible"**
- Solution: Ensure Docker is running
- Check Jenkins has permission to access Docker socket
- On Linux: `sudo usermod -aG docker jenkins`

**Error: "Test failures"**
- Solution: Run `npm test` locally first to verify tests pass
- Check package.json has correct test script

**Error: "Docker Hub push fails"**
- Solution: Verify Docker Hub credentials in Jenkins
- Check Docker Hub username and token
- Ensure token has write permissions

### Common Issues

1. **Build hangs on "npm install"**
   - Check internet connection
   - Try: `npm cache clean --force` in backend/frontend directories

2. **React build fails with memory issues**
   - Increase Node memory: Add to Jenkinsfile
   ```groovy
   sh 'export NODE_OPTIONS=--max-old-space-size=4096 && npm run build'
   ```

3. **Docker Compose fails to start**
   - Check port availability: `lsof -i :5001` (for backend port)
   - Check database credentials match environment variables

---

## Pipeline Stages Explained

| Stage | Purpose | Output |
|-------|---------|--------|
| Checkout | Clone repo from GitHub | Code ready for build |
| Backend Install | npm install for backend | node_modules created |
| Frontend Install | npm install for frontend | node_modules created |
| Backend Build | Prepare backend files | Server ready |
| Frontend Build | React build optimization | Build/ folder created |
| Backend Test | Run backend unit tests | junit.xml with results |
| Frontend Test | Run React tests | junit.xml with results |
| Build Docker | Create Docker images | Images ready for push |
| Push Docker | Upload to Docker Hub | Images in registry |
| Deploy Docker | Run with docker-compose | Application running |

---

## Deliverables Checklist

- [x] GitHub repo with Jenkinsfile
- [x] Jenkins pipeline successfully builds
- [x] Tests run and report to Jenkins
- [x] Docker images built and pushed
- [x] docker-compose.yml configured
- [ ] Screenshots of successful pipeline run
- [ ] Screenshots of test results
- [ ] Screenshots of Docker images on Docker Hub
- [ ] (Optional) Render deployment working
- [ ] README with configuration details

---

## Additional Resources

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Alternative](https://github.com/features/actions)
- [Render.com Documentation](https://render.com/docs)

---

## Contact & Support

For issues or questions, check:
1. Jenkins console output for detailed error messages
2. This README troubleshooting section
3. Assignment requirements document

---

**Last Updated**: April 23, 2026
**Status**: Pipeline Configuration Complete