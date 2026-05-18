#!/usr/bin/env python3
"""
Comprehensive backend API tests for Neural Command Interface portfolio
Tests all 11 endpoint groups as specified in the review request
"""

import requests
import json
import time
from typing import Dict, Any, List

# Base URL from .env - NEXT_PUBLIC_BASE_URL
BASE_URL = "https://infra-pilot-2.preview.emergentagent.com"
API_PREFIX = "/api"

def make_url(path: str) -> str:
    """Construct full API URL with /api prefix"""
    if not path.startswith('/'):
        path = '/' + path
    return f"{BASE_URL}{API_PREFIX}{path}"

def print_test_header(test_name: str):
    """Print formatted test header"""
    print(f"\n{'='*80}")
    print(f"TEST: {test_name}")
    print('='*80)

def print_result(success: bool, message: str):
    """Print test result"""
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status}: {message}")

def test_health_endpoint():
    """Test 1: GET /api → health check"""
    print_test_header("Health Endpoint (GET /api)")
    
    try:
        response = requests.get(make_url("/"), timeout=10)
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        # Check required fields
        if "message" not in data:
            print_result(False, "Missing 'message' field")
            return False
        
        if data.get("status") != "operational":
            print_result(False, f"Expected status='operational', got '{data.get('status')}'")
            return False
        
        if "time" not in data:
            print_result(False, "Missing 'time' field")
            return False
        
        print_result(True, f"Health check passed: {data['message']}")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_root_endpoint():
    """Test 2: GET /api/root → same as health"""
    print_test_header("Root Endpoint (GET /api/root)")
    
    try:
        response = requests.get(make_url("/root"), timeout=10)
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        if data.get("status") != "operational":
            print_result(False, f"Expected status='operational', got '{data.get('status')}'")
            return False
        
        print_result(True, "Root endpoint returns health check")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_contact_valid():
    """Test 3a: POST /api/contact with valid data"""
    print_test_header("Contact API - Valid Submission")
    
    try:
        payload = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "subject": "Test Subject",
            "message": "This is a test message from the backend test suite."
        }
        
        response = requests.post(make_url("/contact"), json=payload, timeout=10)
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        if not data.get("ok"):
            print_result(False, "Expected ok=true in response")
            return False
        
        if "id" not in data:
            print_result(False, "Missing 'id' field in response")
            return False
        
        # Verify it's a UUID format
        message_id = data["id"]
        if len(message_id) < 32:
            print_result(False, f"ID doesn't look like UUID: {message_id}")
            return False
        
        print_result(True, f"Message saved successfully with ID: {message_id}")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_contact_missing_name():
    """Test 3b: POST /api/contact missing name"""
    print_test_header("Contact API - Missing Name")
    
    try:
        payload = {
            "email": "test@example.com",
            "message": "Test message"
        }
        
        response = requests.post(make_url("/contact"), json=payload, timeout=10)
        
        if response.status_code != 400:
            print_result(False, f"Expected status 400, got {response.status_code}")
            return False
        
        data = response.json()
        
        if "error" not in data:
            print_result(False, "Expected 'error' field in response")
            return False
        
        print_result(True, f"Correctly rejected with error: {data['error']}")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_contact_missing_email():
    """Test 3c: POST /api/contact missing email"""
    print_test_header("Contact API - Missing Email")
    
    try:
        payload = {
            "name": "John Doe",
            "message": "Test message"
        }
        
        response = requests.post(make_url("/contact"), json=payload, timeout=10)
        
        if response.status_code != 400:
            print_result(False, f"Expected status 400, got {response.status_code}")
            return False
        
        data = response.json()
        
        if "error" not in data:
            print_result(False, "Expected 'error' field in response")
            return False
        
        print_result(True, f"Correctly rejected with error: {data['error']}")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_contact_missing_message():
    """Test 3d: POST /api/contact missing message"""
    print_test_header("Contact API - Missing Message")
    
    try:
        payload = {
            "name": "John Doe",
            "email": "test@example.com"
        }
        
        response = requests.post(make_url("/contact"), json=payload, timeout=10)
        
        if response.status_code != 400:
            print_result(False, f"Expected status 400, got {response.status_code}")
            return False
        
        data = response.json()
        
        if "error" not in data:
            print_result(False, "Expected 'error' field in response")
            return False
        
        print_result(True, f"Correctly rejected with error: {data['error']}")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_contact_long_strings():
    """Test 3e: POST /api/contact with very long strings (should cap, not throw)"""
    print_test_header("Contact API - Long String Handling")
    
    try:
        payload = {
            "name": "A" * 500,  # Should be capped to 200
            "email": "test@example.com",
            "message": "M" * 10000  # Should be capped to 5000
        }
        
        response = requests.post(make_url("/contact"), json=payload, timeout=10)
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        if not data.get("ok"):
            print_result(False, "Expected ok=true in response")
            return False
        
        print_result(True, "Long strings handled correctly (capped without error)")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_messages_list():
    """Test 4: GET /api/messages"""
    print_test_header("Messages List (GET /api/messages)")
    
    try:
        response = requests.get(make_url("/messages"), timeout=10)
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        if not isinstance(data, list):
            print_result(False, f"Expected array, got {type(data)}")
            return False
        
        # Check that messages don't have _id field
        for msg in data:
            if "_id" in msg:
                print_result(False, "Found '_id' field in message (should be stripped)")
                return False
            
            # Check required fields
            required_fields = ["id", "name", "email", "message", "created_at", "read"]
            for field in required_fields:
                if field not in msg:
                    print_result(False, f"Missing required field '{field}' in message")
                    return False
        
        print_result(True, f"Messages list returned successfully ({len(data)} messages)")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_projects_list():
    """Test 5: GET /api/projects"""
    print_test_header("Projects List (GET /api/projects)")
    
    try:
        response = requests.get(make_url("/projects"), timeout=10)
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        if not isinstance(data, list):
            print_result(False, f"Expected array, got {type(data)}")
            return False
        
        # Check for seed projects
        expected_slugs = ["devsync", "ai-study-buddy", "infrapilot"]
        found_slugs = [p.get("slug") for p in data]
        
        for slug in expected_slugs:
            if slug not in found_slugs:
                print_result(False, f"Missing seed project: {slug}")
                return False
        
        # Check no _id field
        for project in data:
            if "_id" in project:
                print_result(False, "Found '_id' field in project (should be stripped)")
                return False
        
        print_result(True, f"Projects list returned successfully ({len(data)} projects, all seed projects present)")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_blog_list():
    """Test 6: GET /api/blog"""
    print_test_header("Blog List (GET /api/blog)")
    
    try:
        response = requests.get(make_url("/blog"), timeout=10)
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        if not isinstance(data, list):
            print_result(False, f"Expected array, got {type(data)}")
            return False
        
        # Check for seed blog posts
        expected_slugs = [
            "arch-linux-hyprland-setup",
            "terraform-github-actions-pipeline",
            "llm-fine-tuning-lora-guide"
        ]
        found_slugs = [p.get("slug") for p in data]
        
        for slug in expected_slugs:
            if slug not in found_slugs:
                print_result(False, f"Missing seed blog post: {slug}")
                return False
        
        # Check no _id field
        for post in data:
            if "_id" in post:
                print_result(False, "Found '_id' field in blog post (should be stripped)")
                return False
        
        print_result(True, f"Blog list returned successfully ({len(data)} posts, all seed posts present)")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_lab_list():
    """Test 7: GET /api/lab"""
    print_test_header("Lab List (GET /api/lab)")
    
    try:
        response = requests.get(make_url("/lab"), timeout=10)
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        if not isinstance(data, list):
            print_result(False, f"Expected array, got {type(data)}")
            return False
        
        # Check for seed lab experiments
        expected_slugs = [
            "local-ai-agent",
            "hyprland-shaders",
            "terminal-dashboard-go",
            "posture-monitor-cv",
            "dotfiles-sync"
        ]
        found_slugs = [p.get("slug") for p in data]
        
        for slug in expected_slugs:
            if slug not in found_slugs:
                print_result(False, f"Missing seed lab experiment: {slug}")
                return False
        
        # Check no _id field
        for experiment in data:
            if "_id" in experiment:
                print_result(False, "Found '_id' field in lab experiment (should be stripped)")
                return False
        
        print_result(True, f"Lab list returned successfully ({len(data)} experiments, all seed experiments present)")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_system_status():
    """Test 8: GET /api/system/status"""
    print_test_header("System Status (GET /api/system/status)")
    
    try:
        response = requests.get(make_url("/system/status"), timeout=10)
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        # Check required top-level fields
        required_fields = ["services", "metrics", "deploys", "counts"]
        for field in required_fields:
            if field not in data:
                print_result(False, f"Missing required field: {field}")
                return False
        
        # Check services array
        if not isinstance(data["services"], list):
            print_result(False, "services should be an array")
            return False
        
        expected_services = ["Portfolio", "API", "Database", "Edge Network"]
        service_names = [s.get("name") for s in data["services"]]
        
        for service in expected_services:
            if service not in service_names:
                print_result(False, f"Missing service: {service}")
                return False
        
        # Check counts
        if "messages" not in data["counts"]:
            print_result(False, "Missing counts.messages")
            return False
        
        if "projects" not in data["counts"]:
            print_result(False, "Missing counts.projects")
            return False
        
        print_result(True, f"System status returned successfully (messages: {data['counts']['messages']}, projects: {data['counts']['projects']})")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_create_project():
    """Test 9: POST /api/projects (CRUD demo)"""
    print_test_header("Create Project (POST /api/projects)")
    
    try:
        # Create a new project
        payload = {
            "title": "Test Project from Backend Suite",
            "slug": f"test-project-{int(time.time())}",
            "category": "Testing",
            "tags": ["Python", "Testing", "API"],
            "description": "This is a test project created by the backend test suite"
        }
        
        response = requests.post(make_url("/projects"), json=payload, timeout=10)
        
        if response.status_code != 200:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
        
        data = response.json()
        
        # Check that response includes the created project
        if "id" not in data:
            print_result(False, "Missing 'id' field in response")
            return False
        
        if data.get("slug") != payload["slug"]:
            print_result(False, f"Slug mismatch: expected {payload['slug']}, got {data.get('slug')}")
            return False
        
        created_slug = data["slug"]
        
        # Now verify it appears in GET /api/projects
        time.sleep(0.5)  # Small delay to ensure DB write completes
        
        get_response = requests.get(make_url("/projects"), timeout=10)
        if get_response.status_code != 200:
            print_result(False, "Failed to fetch projects list after creation")
            return False
        
        projects = get_response.json()
        found = any(p.get("slug") == created_slug for p in projects)
        
        if not found:
            print_result(False, f"Created project with slug '{created_slug}' not found in projects list")
            return False
        
        print_result(True, f"Project created successfully and appears in list (slug: {created_slug})")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_unknown_route():
    """Test 10: Unknown route returns 404"""
    print_test_header("Unknown Route (GET /api/totally-fake-endpoint)")
    
    try:
        response = requests.get(make_url("/totally-fake-endpoint"), timeout=10)
        
        if response.status_code != 404:
            print_result(False, f"Expected status 404, got {response.status_code}")
            return False
        
        data = response.json()
        
        if "error" not in data:
            print_result(False, "Expected 'error' field in response")
            return False
        
        if "/totally-fake-endpoint" not in data["error"]:
            print_result(False, f"Error message should mention the route: {data['error']}")
            return False
        
        print_result(True, f"Unknown route correctly returns 404: {data['error']}")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_options_preflight():
    """Test 11: OPTIONS preflight returns CORS headers"""
    print_test_header("OPTIONS Preflight (CORS)")
    
    try:
        response = requests.options(make_url("/contact"), timeout=10)
        
        # Accept both 200 and 204 (204 No Content is standard for OPTIONS)
        if response.status_code not in [200, 204]:
            print_result(False, f"Expected status 200 or 204, got {response.status_code}")
            return False
        
        # Check CORS headers
        required_headers = [
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Methods",
            "Access-Control-Allow-Headers"
        ]
        
        for header in required_headers:
            if header not in response.headers:
                print_result(False, f"Missing CORS header: {header}")
                return False
        
        print_result(True, f"OPTIONS preflight successful with CORS headers")
        return True
        
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def run_all_tests():
    """Run all backend tests and report results"""
    print("\n" + "="*80)
    print("NEURAL COMMAND INTERFACE - BACKEND API TEST SUITE")
    print(f"Base URL: {BASE_URL}")
    print(f"API Prefix: {API_PREFIX}")
    print("="*80)
    
    tests = [
        ("Health Endpoint", test_health_endpoint),
        ("Root Endpoint", test_root_endpoint),
        ("Contact - Valid", test_contact_valid),
        ("Contact - Missing Name", test_contact_missing_name),
        ("Contact - Missing Email", test_contact_missing_email),
        ("Contact - Missing Message", test_contact_missing_message),
        ("Contact - Long Strings", test_contact_long_strings),
        ("Messages List", test_messages_list),
        ("Projects List", test_projects_list),
        ("Blog List", test_blog_list),
        ("Lab List", test_lab_list),
        ("System Status", test_system_status),
        ("Create Project", test_create_project),
        ("Unknown Route 404", test_unknown_route),
        ("OPTIONS Preflight", test_options_preflight),
    ]
    
    results = []
    
    for test_name, test_func in tests:
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"\n❌ CRITICAL ERROR in {test_name}: {str(e)}")
            results.append((test_name, False))
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    print("\n" + "="*80)
    print(f"TOTAL: {passed}/{total} tests passed ({(passed/total)*100:.1f}%)")
    print("="*80)
    
    return passed == total

if __name__ == "__main__":
    success = run_all_tests()
    exit(0 if success else 1)
