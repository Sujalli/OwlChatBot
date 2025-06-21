const map = {
  'USA': "Study in the U.S. with top universities, OPT, and scholarships.",
  'Canada': "Quality education, co-op jobs, and PR pathways in Canada.",
  'Ireland': "English-speaking, great universities, and post-study work in Ireland.",
  'UK': "Prestigious UK colleges with work options and scholarships.",
  'Dubai': "Modern education and global exposure in Dubai.",
  'Singapore': "Top Asian universities, safety, and job market in Singapore.",
  'Germany': "Free tuition, top tech programs, and jobs in Germany.",
  'Australia': "Study in Australia with top universities and work options."
};

function getBotResponse(message) {
  switch (message) {
    case 'Hello':
      return {
        reply: 'Hi! What do you want to know?',
        options: ['About us', 'Contact', 'Countries']
      };

    case 'About us':
      return {
        reply: 'We guide students abroad. Started by Yash Shah.',
        options: ['Back', 'Contact', 'Countries']
      };

    case 'Contact':
      return {
        reply: 'Choose how you want to reach us.',
        options: ['Email', 'WhatsApp', 'Instagram', 'LinkedIn', 'Call', 'Back']
      };

    case 'Email':
      return {
        reply: '📧 <a href="mailto:info@humblewalking.com">info@humblewalking.com</a>',
        options: ['Back', 'Contact']
      };

    case 'WhatsApp':
      return {
        reply: '💬 <a href="https://wa.me/919326213082" target="_blank">Message us on WhatsApp</a>',
        options: ['Back', 'Contact']
      };

    case 'Instagram':
      return {
        reply: '📷 <a href="https://www.instagram.com/humble.walking/" target="_blank">Follow on Instagram</a>',
        options: ['Back', 'Contact']
      };

    case 'LinkedIn':
      return {
        reply: '💼 <a href="https://www.linkedin.com/company/humblewalking/" target="_blank">Connect on LinkedIn</a>',
        options: ['Back', 'Contact']
      };

    case 'Call':
      return {
        reply: '📞 <a href="tel:+919326213082">+91 93262 13082</a>',
        options: ['Back', 'Contact']
      };

    case 'More':
      return {
        reply: 'Choose a section to continue.',
        options: ['About us', 'Contact', 'Countries']
      };

    case 'Countries':
      return {
        reply: 'Select a country to learn more.',
        options: ['USA', 'Canada', 'Ireland', 'UK', 'Dubai', 'Singapore', 'Germany', 'Australia', 'Back']
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
        reply: map[message],
        options: ['Countries', 'Back']
      };

    case 'Back':
      return {
        reply: 'What do you want to know?',
        options: ['About us', 'Contact', 'Countries']
      };

    case 'Clear Chat':
      return {
        reply: 'Chat cleared. How can I help?',
        options: ['About us', 'Contact', 'Help', 'Countries']
      };

    default:
      return {
        reply: "Sorry, I didn’t get that.",
        options: ['Back']
      };
  }
}

module.exports = getBotResponse;
