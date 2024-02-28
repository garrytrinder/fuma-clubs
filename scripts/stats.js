// read the contents of the PlayerStats.csv file using fs without using external libraries

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'stats.csv');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // read each line in the file
  const lines = data.split('\n');
  const allStats = [];
  lines.slice(1).map(line => {
    const values = line.split(',');

    const stat = {
      position: values[0],
      height: values[1],
      weight: values[2],
      stats: {
        overall: Number.parseInt(values[3]),
        skill_moves: Number.parseInt(values[24]),
        weak_foot: Number.parseInt(values[13]),
        acceleration: Number.parseInt(values[4]),
        speed: Number.parseInt(values[5]),
        finishing: Number.parseInt(values[6]),
        fk_accuracy: Number.parseInt(values[7]),
        heading_accuracy: Number.parseInt(values[8]),
        shot_power: Number.parseInt(values[9]),
        long_shots: Number.parseInt(values[10]),
        volleys: Number.parseInt(values[11]),
        penalties: Number.parseInt(values[12]),
        vision: Number.parseInt(values[14]),
        crossing: Number.parseInt(values[15]),
        long_pass: Number.parseInt(values[16]),
        short_pass: Number.parseInt(values[17]),
        curve: Number.parseInt(values[18]),
        agility: Number.parseInt(values[19]),
        balance: Number.parseInt(values[20]),
        attacking_position: Number.parseInt(values[21]),
        ball_control: Number.parseInt(values[22]),
        dribbling: Number.parseInt(values[23]),
        interceptions: Number.parseInt(values[25]),
        defensive_awareness: Number.parseInt(values[26]),
        standing_tackle: Number.parseInt(values[27]),
        sliding_tackle: Number.parseInt(values[28]),
        jumping: Number.parseInt(values[29]),
        stamina: Number.parseInt(values[30]),
        strength: Number.parseInt(values[31]),
        reactions: Number.parseInt(values[32]),
        aggression: Number.parseInt(values[33]),
        gk_diving: Number.parseInt(values[34]),
        gk_handling: Number.parseInt(values[35]),
        gk_kicking: Number.parseInt(values[36]),
        gk_reflexes: Number.parseInt(values[37]),
        gk_positioning: Number.parseInt(values[38]),
      },
    };

    allStats.push(stat);
  });
  console.log(JSON.stringify(allStats, null, 2));
});
