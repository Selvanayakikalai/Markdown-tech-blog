pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'selvanayaki06/markdown-tech-blog'
        IMAGE_TAG    = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code from Git repository...'
                checkout scm
            }
        }

        stage('Validate') {
            steps {
                echo 'Validating static application assets...'
                script {
                    if (isUnix()) {
                        sh '''
                            test -f index.html || { echo "Error: index.html missing"; exit 1; }
                            test -f style.css || { echo "Error: style.css missing"; exit 1; }
                            test -f script.js || { echo "Error: script.js missing"; exit 1; }
                            test -f Dockerfile || { echo "Error: Dockerfile missing"; exit 1; }
                            echo "Validation passed: All core application and Docker configuration files are present."
                        '''
                    } else {
                        bat '''
                            @echo off
                            if not exist index.html (echo Error: index.html missing & exit /b 1)
                            if not exist style.css (echo Error: style.css missing & exit /b 1)
                            if not exist script.js (echo Error: script.js missing & exit /b 1)
                            if not exist Dockerfile (echo Error: Dockerfile missing & exit /b 1)
                            echo Validation passed: All core application and Docker configuration files are present.
                        '''
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo "Building Docker image ${DOCKER_IMAGE}:${IMAGE_TAG}..."
                script {
                    if (isUnix()) {
                        sh '''
                            docker build -t ${DOCKER_IMAGE}:${IMAGE_TAG} -t ${DOCKER_IMAGE}:latest .
                            echo "Docker image build successful."
                        '''
                    } else {
                        bat '''
                            docker build -t %DOCKER_IMAGE%:%IMAGE_TAG% -t %DOCKER_IMAGE%:latest .
                            if %ERRORLEVEL% neq 0 (echo Error: Docker build failed & exit /b 1)
                            echo Docker image build successful.
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution complete.'
        }
        success {
            echo 'Jenkins Pipeline completed successfully!'
        }
        failure {
            echo 'Jenkins Pipeline failed. Please check build logs for errors.'
        }
    }
}
