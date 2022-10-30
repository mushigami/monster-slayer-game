const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      specialAttackRecharge: 0, // healing also increases charging duration
      healCharge: 3, // maximum number of healing you can do
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyles(){
        return { 
            width: this.monsterHealth + '%'
        }
    },
    playerBarStyles(){
        return { 
            width: this.playerHealth + '%'
        }
    },
    mayUseSpecialAttack(){
        return this.specialAttackRecharge === 0;
    },
    mayHeal(){
        return this.healCharge > 0;
    },
  },
  watch: {
    playerHealth(value) {
        if(value <= 0 && this.monsterHealth <=0){
            this.winner = 'draw';
        } else if(value <= 0 ){
            this.winner = 'monster'
        }
    },
    monsterHealth(value) {
        if(value <=0 && this.playerHealth <= 0){
            this.winner = 'draw';
        } else if(value <= 0){
            this.winner = 'player';
        }
    },
  },
  methods: {
    attackMonster() {
        if(this.specialAttackRecharge > 0){
            this.specialAttackRecharge--;
        }
        const attackDamage = getRandomValue(5, 12);
        this.monsterHealth -= attackDamage;
        this.attackPlayer(); // maybe should be via a probability factor.
        this.addLogMessage('player', 'attack', attackDamage);
    },
    attackPlayer() {
        const attackDamage = getRandomValue(8, 15);
        this.playerHealth -= attackDamage;
        this.playerHealth = this.playerHealth < 0 ? 0 : this.playerHealth;
        this.addLogMessage('monster', 'attack', attackDamage);
        
    },
    specialAttackMonster(){
        this.specialAttackRecharge = 3;
        const attackDamage = getRandomValue(10, 25);
        this.monsterHealth -= attackDamage;
        this.monsterHealth = this.monsterHealth < 0 ? 0 : this.monsterHealth;
        this.attackPlayer();
        this.addLogMessage('player', 'special-attack', attackDamage);
    },
    healPlayer(){
        this.healCharge--;
        this.specialAttackReharge++;
        const healValue = getRandomValue(8,20);
        this.playerHealth += healValue;
        this.playerHealth =  this.playerHealth > 100 ? 100 : this.playerHealth;
        this.attackPlayer();
        this.addLogMessage('player', 'heal', healValue);
    },
    startGame(){
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.winner = null;
        this.specialAttackRecharge = 0;
        this.healCharge = 3;
        this.logMessages = [];

    },
    surrender(){
        this.winner = 'monster';
    },
    addLogMessage(who, what, value){

        this.logMessages.unshift({
            actionBy: who,
            actionType: what,
            actionValue: value,
        });
    }
  },
});

app.mount("#game");
