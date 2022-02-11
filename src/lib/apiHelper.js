export const getTokenFromServer = async (bodyData) => {
  try {
    const result = await fetch('https://authorization-server.com/token', {
      method: 'post',
      body: JSON.stringify(bodyData),
    });
    return result;
  } catch (error) {
    throw error;
  }
};
