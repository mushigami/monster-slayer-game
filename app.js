const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      specialAttackCharge: 0, // healing also increases charging duration
      healCharge: 3, // maximum number of healing you can do
      winner: null,
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
        return this.specialAttackCharge === 0;
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
        if(this.specialAttackCharge > 0){
            this.specialAttackCharge--;
        }
        const attackDamage = getRandomValue(5, 12);
        this.monsterHealth -= attackDamage;
        this.attackPlayer(); // maybe should be via a probability factor.
    },
    attackPlayer() {
        const attackDamage = getRandomValue(8, 15);
        this.playerHealth -= attackDamage;
        this.playerHealth = this.playerHealth < 0 ? 0 : this.playerHealth;
        
    },
    specialAttackMonster(){
        this.specialAttackCharge = 3;
        const attackDamage = getRandomValue(10, 25);
        this.monsterHealth -= attackDamage;
        this.monsterHealth = this.monsterHealth < 0 ? 0 : this.monsterHealth;
        this.attackPlayer();
    },
    healPlayer(){
        this.healCharge--;
        this.specialAttackCharge++;
        const healValue = getRandomValue(8,20);
        this.playerHealth += healValue;
        this.playerHealth =  this.playerHealth > 100 ? 100 : this.playerHealth;
        this.attackPlayer();
    }
  },
});

app.mount("#game");
