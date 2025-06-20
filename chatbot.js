

const map = {
  'USA': "The U.S.A. offers unmatched academic flexibility, top universities like MIT and Stanford, and strong post-study work options. Choose from 4,000+ institutions in iconic cities. With scholarships, OPT/STEM pathways, and part-time work, studying in the U.S. is more accessible than you think.",
  
  'Canada': "Canada is known for quality education, co-op programs, and PR-friendly policies. Cities like Toronto and Vancouver host top universities. With scholarships, part-time work, and inclusive communities, it’s ideal for Indian students.",
  
  'Ireland': "Ireland offers world-class education, English-speaking environment, and post-study work opportunities. With top universities like Trinity College Dublin, it’s a great choice for Indian students seeking quality education in Europe.",
  
  'UK': "The UK is home to prestigious universities like Oxford and Cambridge. With a rich cultural heritage, diverse courses, and post-study work options, it’s a top choice for Indian students. Scholarships and part-time work opportunities make it accessible.",
  
  'Dubai': "Dubai offers a unique blend of modern education and cultural diversity. With top universities like the University of Dubai, it’s ideal for Indian students seeking quality education in a global city. Scholarships and part-time work options enhance the experience.",
  
  'Singapore': "Singapore is a global education hub with top universities like NUS and NTU. Known for its safety, multicultural environment, and strong job market, it’s a top choice for Indian students. Scholarships and part-time work opportunities make it accessible.",
  
  'Germany': "Germany offers world-class education with no tuition fees at public universities. Known for its engineering and technical programs, it’s ideal for Indian students. With a strong job market, scholarships, and part-time work options, studying in Germany is both affordable and rewarding.",
  
  'Australia': "Australia is known for its high-quality education system, diverse culture, and post-study work opportunities. With top universities like the University of Melbourne and the Australian National University, it’s a popular choice for Indian students. Scholarships, part-time work options, and a welcoming environment make it an attractive destination."
};


function getBotResponse(message) {
  switch (message) {
    case 'Hello':
      return {
        reply: 'Welcome! What do you want to know?',
        options: ['About us', 'Contact', 'Countries']
      };

    case 'About us':
      return {
        reply: 'At HumbleWalking, we believe studying abroad is more than just paperwork — it’s a life-changing journey. Founded by Yash Shah after years of experience living and working in Canada’s immigration and banking sectors, HumbleWalking was born out of real stories, personal struggles, and a passion for guiding others.!',
        options: ['Back', 'Contact', 'Countries']
      };

    case 'Contact':
      return {
        reply: `
          You can contact us at:<br><br>
          📧 Email: <a href="mailto:info@humblewalking.com">info@humblewalking.com</a><br>
          📷 Instagram: <a href="https://www.instagram.com/humble.walking/" target="_blank">instagram.com/humble.walking</a><br>
          💼 LinkedIn: <a href="https://www.linkedin.com/company/humblewalking/" target="_blank">linkedin.com/company/humblewalking</a><br>
          📞 Phone: <a href="tel:+919326213082">+91 93262 13082</a>
        `,
        options: ['Back', 'Countries']
      };

    case 'More':
      return {
        reply: 'Select an option to learn more.',
        options: ['About us', 'Contact', 'Countries']
      };

    case 'Countries':
      return {
        reply: 'Here are the countries we currently serve:',
        options: ['USA', 'Canada', 'Ireland', 'UK', 'Dubai', 'Singapore', 'Germany', 'Australia','Back']
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
        reply: `Great choice! We offer full support for studying abroad in ${map[message]}.`,
        options: ['Countries','Back']
      };

    case 'Back':
      return {
        reply: 'What do you want to know?',
        options: ['About us', 'Contact', 'Countries']
      };

    case 'Clear Chat':
      return {
        reply: 'Chat cleared. How can I assist you?',
        options: ['About us', 'Contact', 'Help', 'Countries']
      };

    default:
      return {
        reply: "I didn't understand that.",
        options: ['Back']
      };
  }
}

module.exports = getBotResponse;
