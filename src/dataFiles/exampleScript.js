const exampleButtonCallback =  async (data) => {
  const res = await axios.post('http://localhost:8090/gameSession/register/buttonClick', data);
  console.log({sent: data, received: res});
}