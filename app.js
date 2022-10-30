const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      specialAttackCharge: 0,
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
    }
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
        
    },
    specialAttackMonster(){
        this.specialAttackCharge = 3;
        const attackDamage = getRandomValue(10, 25);
        this.monsterHealth -= attackDamage;
        this.attackPlayer();
    }
  },
});

app.mount("#game");
