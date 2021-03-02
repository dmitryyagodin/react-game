function getLocalStorage() {
  const savedTheme = localStorage.getItem('theme');
  const savedMode = localStorage.getItem('mode');
  const savedLevel = localStorage.getItem('level');
  const savedSound = localStorage.getItem('sound');
  const storage = { theme: savedTheme,
                  mode: savedMode,
                  level: savedLevel,
                  sound: savedSound,
                  };
  return storage
}

export default getLocalStorage;