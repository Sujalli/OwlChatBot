
const fs = require('fs');
const path = require('path');

const map = {
  'USA': "The U.S.A. offers unmatched academic flexibility, top universities like MIT and Stanford...",
  'Canada': "Canada is known for quality education, co-op programs...",
  'Ireland': "Ireland offers world-class education, English-speaking environment...",
  'UK': "The UK is home to prestigious universities like Oxford and Cambridge...",
  'Dubai': "Dubai offers a unique blend of modern education and cultural diversity...",
  'Singapore': "Singapore is a global education hub with top universities like NUS and NTU...",
  'Germany': "Germany offers world-class education with no tuition fees at public universities...",
  'Australia': "Australia is known for its high-quality education system, diverse culture..."
};

let formState = {
  active: false,
  step: 0,
  data: {}
};

const steps = [
  { key: 'fullName', question: 'Please enter your Full Name:' },
  { key: 'contactNumber', question: 'Please enter your Contact Number:' },
  { key: 'email', question: 'Please enter your Email:' },
  { key: 'country', question: 'Which country are you planning for?' },
  { key: 'universityPreference', question: 'Any preferred university?' },
  { key: 'course', question: 'Which course are you planning to pursue?' }
];

function getBotResponse(message) {
  if (formState.active) 
    {
      
    const currentStep = steps[formState.step];

  const input = message.trim();

  // ✨ Field-specific validation
  switch (currentStep.key) {
    case 'email':
  if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(input)) {
    return { reply: "❌ Please enter a valid email address (e.g., name@example.com):", options: [] };
  }
  break;

    case 'contactNumber':
      if (!/^[0-9]{7,15}$/.test(input)) {
        return { reply: "❌ Enter a valid contact number (only digits, min 7):", options: [] };
      }
      break;
    case 'country':
      const validCountries = Object.keys(map).map(c => c.toLowerCase());
      if (!validCountries.includes(input.toLowerCase())) {
        return { reply: `❌ Invalid country. Please choose from: ${Object.keys(map).join(', ')}`, options: [] };
      }
      break;
    default:
      if (input.length < 2 || /^[^a-zA-Z0-9]+$/.test(input)) {
        return { reply: "❌ Please enter a valid response.", options: [] };
      }
  }

  formState.data[currentStep.key] = input;
  formState.step++;

    if (formState.step < steps.length) {
      return { reply: steps[formState.step].question, options: [] };
    } else {
      const csvPath = path.join(__dirname, 'submissions.csv');
      const isNewFile = !fs.existsSync(csvPath);

      if (isNewFile) {
        const headers = steps.map(step => step.key).join(',') + '\n';
        fs.writeFileSync(csvPath, headers);
      }

      const row = steps.map(step => formState.data[step.key]).join(',') + '\n';
      fs.appendFileSync(csvPath, row);

      formState.active = false;
      formState.step = 0;
      formState.data = {};

      return {
        reply: '✅ Thank you! Your details have been submitted successfully.',
        options: ['Back', 'Help', 'Countries']
      };
    }
  }

  switch (message) {
    case 'Hello':
      return {
        reply: 'Welcome! What do you want to know?',
        options: ['About us', 'Contact', 'Help', 'Countries', 'Connect with Company']
      };
    case 'Connect with Company':
      formState.active = true;
      formState.step = 0;
      formState.data = {};
      return { reply: steps[0].question, options: [] };
    case 'About us':
      return {
        reply: 'At HumbleWalking, we believe studying abroad is more than just paperwork...',
        options: ['Back', 'Contact', 'Countries']
      };
    case 'Contact':
      return {
        reply: `
          📧 <a href="mailto:info@humblewalking.com">info@humblewalking.com</a><br>
          📷 <a href="https://www.instagram.com/humble.walking/" target="_blank">Instagram</a><br>
          💼 <a href="https://www.linkedin.com/company/humblewalking/" target="_blank">LinkedIn</a><br>
          📞 <a href="tel:+919326213082">+91 93262 13082</a>
        `,
        options: ['Back', 'Help', 'Countries']
      };
    case 'Countries':
      return {
        reply: 'Here are the countries we currently serve:',
        options: Object.keys(map).concat(['Back'])
      };
    case 'USA':
    case 'Canada':
    case 'Ireland':
    case 'UK':
    case 'Dubai':
    case 'Singapore':
    case 'Germany':
    case 'Australia':
      return {
        reply: `${map[message]}`,
        options: ['Countries', 'Back']
      };
    case 'Back':
      return getBotResponse('Hello');
    
    default:
      if (formState.active) {
        return { reply: "✍️ Please answer the current question to proceed.", options: [] };
      }
      return {

        reply: "🤖 I didn't understand that. Please choose an option or type clearly.",
        options: ['Back']
      };
  }
}

module.exports = getBotResponse;
