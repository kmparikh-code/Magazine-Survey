# Magazine Survey - HubSpot Integration

## WHAT'S IN THIS FOLDER
- `index.html` - Main survey page
- `styles.css` - All styling 
- `script.js` - Survey functionality
- `README.md` - This instruction file

## EMBED CODE FOR HUBSPOT

### Option 1: iframe Embed (Recommended)
\`\`\`html
<iframe src="https://YOURSITE.com/survey/" 
        width="100%" 
        height="700px" 
        frameborder="0"
        style="border: none; border-radius: 10px;">
</iframe>
\`\`\`

### Option 2: Direct HTML Embed
Copy the entire contents of `index.html` and paste directly into HubSpot page/email.

## SURVEY RESPONSE VALUES

The survey has 3 questions with these possible response values:

**Question 1: "Do you read the magazine?"**
- `"usually-yes"` 
- `"generally-no"`

**Question 2: "Do you read the inside front cover message from Trent?"**
- `"of-course"`
- `"of-course-not"`

**Question 3: "Would you like to keep receiving the magazine?"**
- `"yes-please"`
- `"no-thanks"`

## EXAMPLE JSON RESPONSE
When someone completes the survey, it sends this data structure:
\`\`\`json
{
  "responses": {
    "1": "usually-yes",
    "2": "of-course", 
    "3": "yes-please"
  },
  "timestamp": "2025-08-25T16:30:00.000Z",
  "clientId": "HUBSPOT_CONTACT_ID"
}
\`\`\`

## DEVELOPER SETUP REQUIRED

### 1. Host the Files
Upload all 3 files to your web server so the survey is accessible at a URL like:
`https://yoursite.com/survey/`

### 2. Create Backend Endpoint
Set up `/api/survey-submit` to receive POST requests with the JSON data above.

### 3. Add HubSpot Contact ID
Before the survey loads, inject the contact ID:
\`\`\`html
<script>
window.hubspotContactId = 'CONTACT_ID_FROM_HUBSPOT';
</script>
\`\`\`

### 4. Connect to HubSpot API
Send the survey responses to HubSpot contact properties.

## SUBMIT BUTTON BEHAVIOR

**Visual States:**
- **Black (Default):** Submit button appears black when page loads
- **Green (Ready):** Button turns green when all 3 questions are answered
- **Always Clickable:** Button is never disabled - users can always click it

**User Experience:**
- If user clicks submit without answering all questions: **Modal popup appears** with message "Please answer all questions before submitting"
- If user answers all 3 questions and clicks submit: **Form submits successfully** and shows thank you page
- Modal can be closed by clicking "OK", clicking outside the modal, or pressing Escape key

**No Browser Alerts:** The survey uses a styled modal popup instead of browser alert() dialogs for better user experience.

## TECHNICAL SPECS
- 100% Vanilla HTML/CSS/JavaScript
- No external dependencies
- Works in all modern browsers
- Mobile responsive
- Self-contained (except for data submission)
- Keyboard accessible (Tab, Enter, Escape key support)

## QUESTIONS?
Contact: [Your contact info here]