const adjectives = [
    'Mysterious', 'Anonymous', 'Secret', 'Hidden',
    'Unknown', 'Private', 'Incognito', 'Unseen'
  ];
  
  const nouns = [
    'Chatter', 'User', 'Stranger', 'Participant',
    'Visitor', 'Member', 'Person', 'Individual'
  ];
  
  export const generateUsername = () => {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj}${noun}${Math.floor(1000 + Math.random() * 9000)}`;
  };
  