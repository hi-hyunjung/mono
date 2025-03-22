pipeline {
  agent any

  tools {
    nodejs 'mono-22.14.0'
  }

  stages {
    stage('Install') {
      steps {
        echo 'Installing'
        sh 'pnpm install --frozen-lockfile'
      }
    }

    stage('Build'){
      steps {
        echo 'Running turbo build'
        sh 'pnpm dlx turbo run build'
      }
    }
  }
}