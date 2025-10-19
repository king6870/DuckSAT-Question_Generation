#!/usr/bin/env python3
"""
Test script to verify database connection and DuckSAT integration
"""
import os
import sys
from dotenv import load_dotenv

# Load environment variables
env_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=env_path)

def test_database_connection():
    """Test if we can connect to the database"""
    try:
        import psycopg2
        
        database_url = os.getenv('DATABASE_URL')
        if not database_url:
            print("❌ DATABASE_URL not found in .env file")
            return False
        
        if database_url == "your_neon_database_url_here":
            print("❌ Please update DATABASE_URL in .env file with your actual Neon database URL")
            return False
        
        print("🔄 Testing database connection...")
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        # Test basic query
        cur.execute("SELECT COUNT(*) FROM topics")
        topic_count = cur.fetchone()[0]
        print(f"✅ Database connection successful! Found {topic_count} topics.")
        
        # Test subtopics
        cur.execute("SELECT COUNT(*) FROM subtopics")
        subtopic_count = cur.fetchone()[0]
        print(f"✅ Found {subtopic_count} subtopics.")
        
        # Test questions
        cur.execute("SELECT COUNT(*) FROM questions")
        question_count = cur.fetchone()[0]
        print(f"✅ Found {question_count} existing questions.")
        
        conn.close()
        return True
        
    except ImportError:
        print("❌ psycopg2 not installed. Install with: pip install psycopg2-binary")
        return False
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

def test_ducksat_integration():
    """Test if DuckSAT integration functions are available"""
    try:
        from ducksat_integration import store_question_in_ducksat
        print("✅ DuckSAT integration functions imported successfully")
        return True
    except ImportError as e:
        print(f"❌ Failed to import DuckSAT integration: {e}")
        return False

def main():
    print("🧪 Testing DuckSAT Database Integration")
    print("=" * 50)
    
    # Test 1: Environment variables
    print("\n1. Checking environment variables...")
    database_url = os.getenv('DATABASE_URL')
    if database_url and database_url != "your_neon_database_url_here":
        print("✅ DATABASE_URL is configured")
    else:
        print("❌ DATABASE_URL not properly configured")
        return
    
    # Test 2: Database connection
    print("\n2. Testing database connection...")
    if not test_database_connection():
        return
    
    # Test 3: DuckSAT integration
    print("\n3. Testing DuckSAT integration...")
    if not test_ducksat_integration():
        return
    
    print("\n🎉 All tests passed! Ready to generate and save questions.")
    print("\nTo run interactive mode with database saving:")
    print("python llm_query.py --interactive")

if __name__ == "__main__":
    main()
