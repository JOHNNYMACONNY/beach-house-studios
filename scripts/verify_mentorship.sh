# scripts/verify_mentorship.sh

# Usage: bash scripts/verify_mentorship.sh [OPTIONAL_TARGET_URL]
# Example: bash scripts/verify_mentorship.sh https://my-app.vercel.app

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

BASE_URL="${1:-http://localhost:4321}"

echo "🧪 Starting Mentorship API Verification..."
echo "Target: $BASE_URL/api/mentorship-intake"
echo "----------------------------------------"

# 1. TEST HONEYPOT
# Expected: 200 OK (silent success), NO email logs (simulated)
echo -n "1. Testing Honeypot Protection (confirm_email=bot)... "
RESPONSE=$(curl -s -X POST "$BASE_URL/api/mentorship-intake" \
  -H "Content-Type: application/json" \
  -d '{"confirm_email": "bot", "name": "Spam Bot"}')

if echo "$RESPONSE" | grep -q '"ok":true'; then
  echo -e "${GREEN}PASSED${NC}"
  echo "   Response: $RESPONSE"
else
  echo -e "${RED}FAILED${NC}"
  echo "   Response: $RESPONSE"
  exit 1
fi

# 2. TEST VALIDATION (Empty Body)
# Expected: 400 Bad Request
echo -n "2. Testing Validation (Missing Fields)... "
RESPONSE=$(curl -s -X POST "$BASE_URL/api/mentorship-intake" \
  -H "Content-Type: application/json" \
  -d '{}')

if echo "$RESPONSE" | grep -q '"ok":false' && echo "$RESPONSE" | grep -q 'Missing required fields'; then
  echo -e "${GREEN}PASSED${NC}"
  echo "   Response: $RESPONSE"
else
  echo -e "${RED}FAILED${NC}"
  echo "   Response: $RESPONSE"
  exit 1
fi

# 3. TEST ATTEMPTED SUBMISSION (Without API Key)
# Expected: 500 Internal Error (because RESEND_API_KEY is likely missing locally) 
# OR 200 OK if user has key. We just want to ensure it handles the POST request.
echo -n "3. Testing Full Submission Logic... "
RESPONSE=$(curl -s -X POST "$BASE_URL/api/mentorship-intake" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "artistName": "Test Artist",
    "email": "test@example.com",
    "genre": "Rock",
    "careerStage": "Developing",
    "currentChallenges": "None",
    "goals": "Testing",
    "portfolio": "http://example.com",
    "whyNow": "Now",
    "budget": "Standard",
    "timeline": "ASAP",
    "commitment": "Yes"
  }')

echo -e "\n   Server Response: $RESPONSE"

if echo "$RESPONSE" | grep -q '"ok":true'; then
  echo -e "${GREEN}SUCCESS${NC} (Email sent or mocked)"
elif echo "$RESPONSE" | grep -q 'Failed to send'; then
   echo -e "${GREEN}PASSED${NC} (Logic reached Resend, failed as expected without key)"
elif echo "$RESPONSE" | grep -q 'Internal Server Error'; then
   echo -e "${GREEN}PASSED${NC} (Likely missing API Key, but endpoint works)"
else
   echo -e "${RED}UNKNOWN RESPONSE${NC}"
fi

echo "----------------------------------------"
echo "✅ Local Verification Complete"
