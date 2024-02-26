// read the contents of the PlayerStats.csv file using fs without using external libraries

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "stats.csv");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // read each line in the file
  const lines = data.split("\n");
  const headers = lines[0].split(",");
  const allStats = [];
  const stats = lines.slice(1).map((line) => {
    const values = line.split(",");

    const stat = {
      position: values[0],
      height: values[1],
      weight: values[2],
      stats: {
        general: {
          overall: Number.parseInt(values[3]),
          skill_moves: Number.parseInt(values[24]),
          weak_foot: Number.parseInt(values[13]),
        },
        pace: {
          acceleration: {
            min: Number.parseInt(values[4]),
            max: Number.parseInt(values[4]),
          },
          speed: {
            min: Number.parseInt(values[5]),
            max: Number.parseInt(values[5]),
          },
        },
        shooting: {
          finishing: {
            min: Number.parseInt(values[6]),
            max: Number.parseInt(values[6]),
          },
          fk_accuracy: {
            min: Number.parseInt(values[7]),
            max: Number.parseInt(values[7]),
          },
          heading_accuracy: {
            min: Number.parseInt(values[8]),
            max: Number.parseInt(values[8]),
          },
          shot_power: {
            min: Number.parseInt(values[9]),
            max: Number.parseInt(values[9]),
          },
          long_shots: {
            min: Number.parseInt(values[10]),
            max: Number.parseInt(values[10]),
          },
          volleys: {
            min: Number.parseInt(values[11]),
            max: Number.parseInt(values[11]),
          },
          penalties: {
            min: Number.parseInt(values[12]),
            max: Number.parseInt(values[12]),
          },
        },
        passing: {
          vision: {
            min: Number.parseInt(values[14]),
            max: Number.parseInt(values[14]),
          },
          crossing: {
            min: Number.parseInt(values[15]),
            max: Number.parseInt(values[15]),
          },
          long_pass: {
            min: Number.parseInt(values[16]),
            max: Number.parseInt(values[16]),
          },
          short_pass: {
            min: Number.parseInt(values[17]),
            max: Number.parseInt(values[17]),
          },
          curve: {
            min: Number.parseInt(values[18]),
            max: Number.parseInt(values[18]),
          },
        },
        dribbling: {
          agility: {
            min: Number.parseInt(values[19]),
            max: Number.parseInt(values[19]),
          },
          balance: {
            min: Number.parseInt(values[20]),
            max: Number.parseInt(values[20]),
          },
          attacking_position: {
            min: Number.parseInt(values[21]),
            max: Number.parseInt(values[21]),
          },
          ball_control: {
            min: Number.parseInt(values[22]),
            max: Number.parseInt(values[22]),
          },
          dribbling: {
            min: Number.parseInt(values[23]),
            max: Number.parseInt(values[23]),
          },
        },
        defending: {
          interceptions: {
            min: Number.parseInt(values[25]),
            max: Number.parseInt(values[25]),
          },
          defensive_awareness: {
            min: Number.parseInt(values[26]),
            max: Number.parseInt(values[26]),
          },
          standing_tackle: {
            min: Number.parseInt(values[27]),
            max: Number.parseInt(values[27]),
          },
          sliding_tackle: {
            min: Number.parseInt(values[28]),
            max: Number.parseInt(values[28]),
          },
        },
        physical: {
          jumping: {
            min: Number.parseInt(values[29]),
            max: Number.parseInt(values[29]),
          },
          stamina: {
            min: Number.parseInt(values[30]),
            max: Number.parseInt(values[30]),
          },
          strength: {
            min: Number.parseInt(values[31]),
            max: Number.parseInt(values[31]),
          },
          reactions: {
            min: Number.parseInt(values[32]),
            max: Number.parseInt(values[32]),
          },
          aggression: {
            min: Number.parseInt(values[33]),
            max: Number.parseInt(values[33]),
          },
        },
        goalkeeping: {
          gk_diving: {
            min: Number.parseInt(values[34]),
            max: Number.parseInt(values[34]),
          },
          gk_handling: {
            min: Number.parseInt(values[35]),
            max: Number.parseInt(values[35]),
          },
          gk_kicking: {
            min: Number.parseInt(values[36]),
            max: Number.parseInt(values[36]),
          },
          gk_reflexes: {
            min: Number.parseInt(values[37]),
            max: Number.parseInt(values[37]),
          },
          gk_positioning: {
            min: Number.parseInt(values[38]),
            max: Number.parseInt(values[38]),
          },
        },
      },
    };

    allStats.push(stat);
  });
  console.log(JSON.stringify(allStats, null, 2));
});
