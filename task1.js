process.stdin.on('data', data => {
    const outputData = data.toString().split("").reverse().join("")
    console.log(outputData);
  });