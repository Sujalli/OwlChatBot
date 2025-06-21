const fs = require('fs');
const path = require('path');

const map = {
  'USA': "The U.S.A. offers unmatched academic flexibility, top universities like MIT and Stanford...",
  'Canada': "Canada is known for quality education, co-op programs...",
  'Ireland': "Ireland offers world-class education, English-speaking environment...",
  'UK': "The UK is home to prestigious universities like Oxford and Cambridge...",
  'UAE': "UAE offers a unique blend of modern education and cultural diversity...",
  'Singapore': "Singapore is a global education hub with top universities like NUS and NTU...",
  'Germany': "Germany offers world-class education with no tuition fees at public universities...",
  'Australia': "Australia is known for its high-quality education system, diverse culture..."
};

let formState = {
  active: false,
  step: 0,
  data: {},
  confirm: false
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
  const input = message.trim();

  if (input === 'Clear Chat') {
    formState = { active: false, step: 0, data: {}, confirm: false };
    return getBotResponse('Hello');
  }

  // Confirmation step logic
  if (formState.confirm) {
    if (input.toLowerCase() === 'yes') {
      const csvPath = path.join(__dirname, 'submissions.csv');
      const isNewFile = !fs.existsSync(csvPath);

      if (isNewFile) {
        const headers = steps.map(step => step.key).join(',') + '\n';
        fs.writeFileSync(csvPath, headers);
      }

      const row = steps.map(step => formState.data[step.key]).join(',') + '\n';
      fs.appendFileSync(csvPath, row);

      formState = { active: false, step: 0, data: {}, confirm: false };

      return {
        reply: '✅ Thank you! Your details have been submitted successfully.',
        options: ['Back', 'Help', 'Countries']
      };
    } else if (input.toLowerCase() === 'back') {
      formState.confirm = false;
      formState.step = steps.length - 1;
      return { reply: steps[formState.step].question, options: ['Back'] };
    } else {
      return {
        reply: '❌ Please type "Yes" to confirm or "Back" to edit your answers.',
        options: ['Back']
      };
    }
  }

  // Back command logic (go to previous question)
  if (input.toLowerCase() === 'back' && formState.active && formState.step > 0) {
    formState.step -= 1;
    return {
      reply: steps[formState.step].question,
      options: formState.step > 0 ? ['Back'] : []
    };
  }

  // Form input handling
  if (formState.active) {
    const currentStep = steps[formState.step];
    let inputFinal = input;

    switch (currentStep.key) {
      case 'email':
        if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(input)) {
          return { reply: "❌ Please enter a valid email address (e.g., name@example.com):", options: ['Back'] };
        }
        break;
      case 'contactNumber':
        if (!/^[0-9]{7,15}$/.test(input)) {
          return { reply: "❌ Enter a valid contact number (only digits, min 7):", options: ['Back'] };
        }
        break;
      case 'country':
        const validCountries = Object.keys(map);
        const matchedCountry = validCountries.find(c => c.toLowerCase() === input.toLowerCase());
        if (!matchedCountry) {
          return {
            reply: `❌ Invalid country. Please choose from: ${validCountries.join(', ')}`,
            options: ['Back']
          };
        }
        inputFinal = matchedCountry;
        break;
      default:
        if (input.length < 2 || /^[^a-zA-Z0-9]+$/.test(input)) {
          return { reply: "❌ Please enter a valid response.", options: ['Back'] };
        }
    }

    formState.data[currentStep.key] = inputFinal;
    formState.step++;

    if (formState.step >= steps.length) {
      formState.confirm = true;
      const summary = steps.map(step => `• ${step.question.replace(':', '')} ${formState.data[step.key]}`).join('<br>');
      return {
        reply: `📝 Please confirm your details:<br><br>${summary}<br><br>Type <strong>Yes</strong> to submit or <strong>Back</strong> to edit.`,
        options: ['Back']
      };
    }

    return {
      reply: steps[formState.step].question,
      options: formState.step > 0 ? ['Back'] : []
    };
  }

  // Outside formState
  switch (input) {
    case 'Hello':
      return {
        reply: 'Welcome! What do you want to know?',
        options: ['About us', 'Contact', 'Help', 'Countries', 'Connect with Company']
      };
    case 'Connect with Company':
      formState = { active: true, step: 0, data: {}, confirm: false };
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
    case 'Back':
      return getBotResponse('Hello');
    default:
      const normalized = input.toLowerCase();
      const matched = Object.keys(map).find(c => c.toLowerCase() === normalized);
      if (matched) {
        return {
          reply: map[matched],
          options: ['Countries', 'Back']
        };
      }

      if (formState.active) {
        return { reply: "✍️ Please answer the current question to proceed.", options: ['Back'] };
      }

      return {
        reply: "🤖 I didn't understand that. Please choose an option or type clearly.",
        options: ['Back']
      };
  }
}

module.exports = getBotResponse;
