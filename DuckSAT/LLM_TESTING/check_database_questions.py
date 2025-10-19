#!/usr/bin/env python3
"""
Script to check what questions are actually stored in the DuckSAT database
"""
import os
import sys
from dotenv import load_dotenv

# Load environment variables
env_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=env_path)

def check_database_questions():
    """Check what questions are stored in the database"""
    try:
        import psycopg2
        
        database_url = os.getenv('DATABASE_URL')
        if not database_url:
            print("ERROR: DATABASE_URL not found in .env file")
            return False
        
        if database_url == "your_neon_database_url_here":
            print("ERROR: Please update DATABASE_URL in .env file with your actual Neon database URL")
            return False
        
        print("Connecting to database...")
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        # Check total questions
        cur.execute("SELECT COUNT(*) FROM questions")
        total_questions = cur.fetchone()[0]
        print(f"Total questions in database: {total_questions}")
        
        # Check recent questions (last 10)
        cur.execute("""
            SELECT id, question, category, subtopic, "createdAt", source
            FROM questions 
            ORDER BY "createdAt" DESC 
            LIMIT 10
        """)
        recent_questions = cur.fetchall()
        
        print(f"\nRecent questions (last 10):")
        print("-" * 80)
        for i, (q_id, question, category, subtopic, created_at, source) in enumerate(recent_questions, 1):
            print(f"{i}. ID: {q_id[:8]}...")
            print(f"   Question: {question[:100]}{'...' if len(question) > 100 else ''}")
            print(f"   Category: {category} | Subtopic: {subtopic}")
            print(f"   Created: {created_at} | Source: {source}")
            print()
        
        # Check questions by source
        cur.execute("""
            SELECT source, COUNT(*) as count
            FROM questions 
            GROUP BY source
            ORDER BY count DESC
        """)
        sources = cur.fetchall()
        
        print("Questions by source:")
        for source, count in sources:
            print(f"   {source}: {count} questions")
        
        # Check questions by category
        cur.execute("""
            SELECT category, COUNT(*) as count
            FROM questions 
            GROUP BY category
            ORDER BY count DESC
        """)
        categories = cur.fetchall()
        
        print("\nQuestions by category:")
        for category, count in categories:
            print(f"   {category}: {count} questions")
        
        conn.close()
        return True
        
    except ImportError:
        print("ERROR: psycopg2 not installed. Install with: pip install psycopg2-binary")
        return False
    except Exception as e:
        print(f"ERROR: Database error: {e}")
        return False

def main():
    print("Checking DuckSAT Database Questions")
    print("=" * 50)
    
    if check_database_questions():
        print("\nDatabase check completed successfully!")
    else:
        print("\nDatabase check failed!")

if __name__ == "__main__":
    main()
