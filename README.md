# Sandbox for Developers on AWS

A modern web interface for deploying and managing guard-railed AWS Lightsail sandbox environments via CloudFormation.

![Sandbox for Developers on AWS](https://img.shields.io/badge/AWS-Lightsail-FF9900?style=flat&logo=amazon-aws)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=flat&logo=fastapi)

## Overview

Spin up **guard-railed Lightsail sandboxes** with automated deployment, monitoring, and cleanup. Perfect for development teams, educational institutions, and organizations needing temporary, cost-controlled AWS environments.

### Key Features

- **Guard-Railed Sandbox** - Secure, time-limited environments with auto-termination
- **Auto Cleanup** - Automatic stack deletion after termination
- **Port Management** - Ports 22, 80, 443 opened automatically
- **SNS Notifications** - Get notified on stack events
- **Modern Web UI** - Easy-to-use interface for deployment configuration
- **CloudFormation Integration** - Leverage AWS infrastructure as code

## Prerequisites

- Node.js v16+ and yarn
- Python 3.9+
- MongoDB
- AWS CLI v2 with configured credentials
- IAM permissions for CloudFormation, Lightsail, SNS
- `jq` utility (for CLI operations)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/sandbox-developers-aws.git
cd sandbox-developers-aws
```

### 2. Frontend Setup

```bash
cd frontend
yarn install
cp .env.example .env  # Configure your backend URL
yarn start
```

The frontend will be available at `http://localhost:3000`

### 3. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env  # Configure your MongoDB and AWS settings
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

The backend API will be available at `http://localhost:8001`

## Configuration

### Frontend (.env)

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

### Backend (.env)

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=sandbox_db
AWS_REGION=ap-southeast-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

## Usage

### Web Interface

1. **Deploy Tab**: Configure AWS region, stack name, instance settings, and bundle size
2. **Manage Tab**: Monitor stack operations, view diagnostics, and force delete if needed
3. **Templates Tab**: Edit CloudFormation templates directly in the browser

### Common CloudFormation Parameters

- `InstanceName` – Lightsail instance name (e.g., `Sandbox-env`)
- `BundleId` – Allowed Lightsail bundle (`nano_3_0`, `micro_3_0`, etc.)
- `SnsTopicArn` – SNS topic for notifications

## Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  React Frontend │────────▶│  FastAPI Backend│────────▶│   AWS Services  │
│                 │         │                 │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
                                    │
                                    │
                            ┌───────▼────────┐
                            │                │
                            │    MongoDB     │
                            │                │
                            └────────────────┘
```

## Technology Stack

### Frontend
- React 19.0
- React Router DOM
- Shadcn UI Components
- Tailwind CSS
- Axios

### Backend
- FastAPI
- Motor (Async MongoDB)
- Boto3 (AWS SDK)
- Python 3.9+

### Infrastructure
- AWS Lightsail
- AWS CloudFormation
- AWS SNS
- MongoDB

## API Endpoints

### Health Check
```bash
GET /api/
```

### Download Project
```bash
GET /api/download-project
```
Downloads the entire project as a GitHub-ready zip file.

## Development

### Frontend Development

```bash
cd frontend
yarn start  # Hot reload enabled
```

### Backend Development

```bash
cd backend
uvicorn server:app --reload  # Hot reload enabled
```

## Deployment

### Docker Deployment

```bash
docker-compose up -d
```

### AWS Lightsail Container Service

1. Build and push containers
2. Create Lightsail container service
3. Deploy using container images

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by AWS Innovation Sandbox
- Built with [Emergent](https://emergent.sh)
- UI components from [Shadcn UI](https://ui.shadcn.com/)

## Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Made with ❤️ for the AWS Developer Community**
