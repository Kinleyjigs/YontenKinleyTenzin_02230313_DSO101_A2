# Jenkins Setup - Quick Checklist

## ✅ What I've Already Done For You:
- [x] Updated Jenkinsfile with complete pipeline (checkout, install, build, test, docker, deploy)
- [x] Updated frontend/package.json with Jest & JUnit testing
- [x] Updated backend/package.json with Jest & JUnit testing  
- [x] Updated docker-compose.yml with correct image tags
- [x] Created comprehensive README.md with full setup instructions

---

## 📋 What YOU Need to Do Next:

### STEP 1: Configure Jenkins Credentials (10 minutes)
**Location**: Jenkins Dashboard > Manage Jenkins > Credentials > System > Global credentials

1. **Add Docker Hub Credentials**
   - Type: Username with password
   - Username: `yonten1234567890`
   - Password: (your Docker Hub access token)
   - ID: `docker-username` and `docker-password`

2. **Add GitHub PAT**
   - Go to: https://github.com/settings/tokens
   - Create new token with `repo` and `admin:repo_hook`
   - Copy token
   - In Jenkins: Add "Username with password"
   - Username: `yontenkinley`
   - Password: (paste GitHub token)

### STEP 2: Configure NodeJS in Jenkins (3 minutes)
**Location**: Manage Jenkins > Tools > NodeJS

1. Click "Add NodeJS"
2. Name: `NodeJS`
3. Version: Select NodeJS LTS (v20.x)
4. Check "Automatically install"
5. Save

### STEP 3: Create Pipeline Job in Jenkins (5 minutes)
1. Click "New Item"
2. Name: `DSO_Assignment2_Pipeline`
3. Type: **Pipeline**
4. Configure:
   - Definition: **Pipeline script from SCM**
   - SCM: **Git**
   - Repository URL: `https://github.com/yontenkinley/DSO_assign2.git`
   - Credentials: Select your GitHub PAT
   - Branch: `*/main`
   - Script Path: `Jenkinsfile`
5. Save

### STEP 4: Run the Pipeline (2-5 minutes)
1. Open your pipeline job
2. Click **"Build Now"**
3. Monitor in **Console Output**
4. Wait for completion (green checkmark = success)

### STEP 5: Verify Results
**Test Results:**
- Go to build page
- Click "Test Results" link
- Should show frontend & backend tests passed

**Docker Images:**
- Go to Docker Hub: hub.docker.com
- Login with your account
- Check if new images exist:
  - `todo-app:backend-latest`
  - `todo-app:frontend-latest`

---

## 🐛 Common Errors & Quick Fixes

### "npm: command not found"
→ Verify NodeJS is configured in Manage Jenkins > Tools

### "Docker daemon not accessible"
→ Ensure Docker Desktop is running

### "GitHub authentication failed"
→ Verify GitHub PAT was created correctly with right permissions

### "Cannot push to Docker Hub"
→ Check Docker Hub credentials are correct in Jenkins

### "Build hangs on npm install"
→ Check your internet connection, try again

---

## 📸 Screenshots to Take (For Assignment Submission)

1. **Jenkins Pipeline Success Page**
   - Shows all green stages
   - Build number and timestamp
   
2. **Console Output**
   - Shows each stage running
   - Final "✓ Pipeline executed successfully"

3. **Test Results Page**
   - Shows test count and passed tests
   - JUnit report

4. **Docker Hub Images**
   - Both images pushed
   - Timestamps match build

5. **Docker Compose Running**
   ```bash
   docker ps
   # Shows all three containers running (frontend, backend, postgres)
   ```

---

## 🚀 Quick Test Before Jenkins (Optional but Recommended)

Test locally first to ensure everything works:

**Test Backend:**
```bash
cd backend
npm install
npm test
```

**Test Frontend:**
```bash
cd frontend
npm install
npm test -- --watchAll=false
```

---

## 📝 Important Notes

- **Render Deployment**: Not required for Assignment 2. If needed, create a new Render repo (see README.md)
- **Database**: docker-compose will automatically create and configure PostgreSQL
- **Test Files**: If you don't have tests yet, Jenkins will still pass (gracefully handles no tests)
- **Credentials**: Never commit credentials to GitHub - Jenkins stores them securely

---

## 🆘 Need Help?

1. **Check Console Output**: Most errors show clear messages here
2. **Check README.md**: Detailed troubleshooting section
3. **Common Issues**: Docker running? Internet connection? Right credentials?
4. **Jenkins Logs**: Manage Jenkins > System Log > All logs

---

## ✅ Success Indicators

Your pipeline is complete when:
- ✓ All 7-8 stages show GREEN in Jenkins
- ✓ Console shows "✓ Pipeline executed successfully"
- ✓ Docker images appear on Docker Hub
- ✓ Test results published to Jenkins
- ✓ docker-compose successfully deploying containers

---

**Status**: All configuration files updated ✅
**Next Action**: Configure Jenkins credentials (STEP 1 above)
**Estimated Time to Completion**: 20-30 minutes
