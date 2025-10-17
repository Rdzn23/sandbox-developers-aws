from fastapi import APIRouter, Response
import zipfile
import io
import os
from pathlib import Path

router = APIRouter()

@router.get("/download-project")
async def download_project():
    """
    Create a zip file of the entire project for GitHub upload
    """
    # Create in-memory zip file
    zip_buffer = io.BytesIO()
    
    # Define base paths
    frontend_dir = Path('/app/frontend')
    backend_dir = Path('/app/backend')
    
    # Files to exclude from zip
    exclude_patterns = [
        'node_modules',
        '__pycache__',
        '.git',
        'build',
        'dist',
        '.env',
        'venv',
        '.DS_Store',
        '*.pyc',
        '*.log'
    ]
    
    def should_exclude(path_str):
        for pattern in exclude_patterns:
            if pattern in path_str:
                return True
        return False
    
    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
        # Add frontend files
        if frontend_dir.exists():
            for root, dirs, files in os.walk(frontend_dir):
                # Filter out excluded directories
                dirs[:] = [d for d in dirs if not should_exclude(d)]
                
                for file in files:
                    file_path = Path(root) / file
                    if not should_exclude(str(file_path)):
                        arcname = f"sandbox-developers-aws/frontend/{file_path.relative_to(frontend_dir)}"
                        zip_file.write(file_path, arcname)
        
        # Add backend files
        if backend_dir.exists():
            for root, dirs, files in os.walk(backend_dir):
                # Filter out excluded directories
                dirs[:] = [d for d in dirs if not should_exclude(d)]
                
                for file in files:
                    file_path = Path(root) / file
                    if not should_exclude(str(file_path)):
                        arcname = f"sandbox-developers-aws/backend/{file_path.relative_to(backend_dir)}"
                        zip_file.write(file_path, arcname)
        
        # Add root level files
        root_files = [
            ('/app/README.md', 'sandbox-developers-aws/README.md'),
            ('/app/.gitignore', 'sandbox-developers-aws/.gitignore'),
            ('/app/LICENSE', 'sandbox-developers-aws/LICENSE'),
            ('/app/docker-compose.yml', 'sandbox-developers-aws/docker-compose.yml'),
        ]
        
        for src, dest in root_files:
            if os.path.exists(src):
                zip_file.write(src, dest)
    
    zip_buffer.seek(0)
    
    return Response(
        content=zip_buffer.getvalue(),
        media_type="application/zip",
        headers={
            "Content-Disposition": "attachment; filename=sandbox-developers-aws.zip"
        }
    )
