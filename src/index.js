const prompt = require('prompt-sync')

const players = [
  {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
  },
  {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
  },
  {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
  },
  {
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
  },
  {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
  },
  {
    NOME: "Donkey Kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
  },    
]

console.clear();
const prpt = prompt()

console.log(
  `\n🏁🏁🏁 BEM VINDO! Vamos começar...🏁🏁🏁 \n
  -> ESCOLHA OS PLAYER 1 e PLAYER 2\n`
);


var idPlay1 = InputPlayer("Player 1");
var idPlay2 = InputPlayer("Player 2",idPlay1);


const player1 = {
  NOME: players[idPlay1-1].NOME,
  VELOCIDADE: players[idPlay1-1].VELOCIDADE,
  MANOBRABILIDADE: players[idPlay1-1].MANOBRABILIDADE,
  PODER: players[idPlay1-1].PODER,
  PONTOS: 0,
};


const player2 = {
  NOME: players[idPlay2-1].NOME,
  VELOCIDADE: players[idPlay2-1].VELOCIDADE,
  MANOBRABILIDADE: players[idPlay2-1].MANOBRABILIDADE,
  PODER: players[idPlay2-1].PODER,
  PONTOS: 0,
};


async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}
async function getRandomWeapons() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.15:
      result = "casco"; //🐢  
      break;
    case random < 0.77:
      result = "bomba"; //💣
      break;
    default:
      result = "";
  }

  return result;
}
async function getRandomPlus() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.75:
      result = "turbo"; //💫  
      break;
    case random < 0.97:
      result = "turbo"; //💫
      break;
    default:
      result = "";
  }

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    let placar = await showPlacar(character1,character2);
    console.log(`🏁 Rodada ${round} - ${placar}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);
    
    // sortear Armas
    let weapons = await getRandomWeapons();

    // sortear Turbo
    let turbo = await getRandomPlus();

    // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "velocidade",
        diceResult1,
        character1.VELOCIDADE
      );

      await logRollResult(
        character2.NOME,
        "velocidade",
        diceResult2,
        character2.VELOCIDADE
      );
      console.log(
        totalTestSkill1 === totalTestSkill2
          ? "Confronto empatado!"
          : ""
      );
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "manobrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE
      );

      await logRollResult(
        character2.NOME,
        "manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE
      );

      console.log(
        totalTestSkill1 === totalTestSkill2
          ? "Confronto empatado!"
          : ""
      );
    }

    if (block === "CONFRONTO") {

      let pontosPerda = 0;
      let icoPerda = weapons === "casco"? "🐢" : weapons === "bomba"? "💣" :"🐢" ;
      let icoPlus = turbo === "turbo"? "💫":"";
      pontosPerda += weapons === "casco"? 1 : weapons === "bomba"? 2:1;

      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);
      console.log(`${icoPerda} ${icoPlus}`)

      await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER
      );

      await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER
      );

      if (powerResult1 > powerResult2) {
        if(character2.PONTOS > 0){
          console.log(
            `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu ${pontosPerda} ponto ${icoPerda}`
          );
          character2.PONTOS -= pontosPerda > character2.PONTOS ? 1 : pontosPerda;
        }
        character1.PONTOS += turbo === "turbo" ? 1:0;
        console.log(turbo === "turbo" ?`${character1.NOME} ganhou 1 ponto ${icoPlus}`:"") 
      }

      if (powerResult2 > powerResult1) {
        if(character1.PONTOS > 0){
          console.log(
            `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu ${pontosPerda} ponto ${icoPerda}`
          );
          character1.PONTOS-= pontosPerda > character1.PONTOS ? 1: pontosPerda;
        }       
        character2.PONTOS += turbo === "turbo" ? 1:0;
        console.log(turbo === "turbo" ?`${character2.NOME} ganhou 1 ponto ${icoPlus}`:"") 
      }

      console.log(
        powerResult2 === powerResult1
          ? "Confronto empatado! Nenhum ponto foi perdido"
          : ""
      );
    }

    // verificando o vencedor
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }

    console.log("-----------------------------");
    await wait(1500); // Espera 1,5 segundo (1500ms).
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS)
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆\n\n`);
  else if (character2.PONTOS > character1.PONTOS)
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆\n\n`);
  else console.log("A corrida terminou em empate\n\n");
}

async function showPlacar(character1,character2){
  return `[${character1.NOME}(${character1.PONTOS}) vs ${character2.NOME}(${character2.PONTOS})]`
}

function InputPlayer(textoPlayer = "Player 1", playerAtual=0) {
  let opcao =0;
  do  {
       opcao = prpt("1-Mario, 2-Peach, 3-Yoshi, 4-Bowser, 5-Luigi e 6-Donkey Kong, Escolha de 1-6 ["+textoPlayer+"]?");
  } while (opcao == playerAtual || opcao>6 || opcao === 0);
  console.log(`Voce escolheu ${textoPlayer}: ${players[opcao-1].NOME}!`);
  return opcao;
}

function wait(time = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

(async function main() {
  console.log(
    `\n🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
