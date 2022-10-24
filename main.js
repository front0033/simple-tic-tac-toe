const defaultGameValues = {
  top1: null,
  top2: null,
  top3: null,
  middle1: null,
  middle2: null,
  middle3: null,
  bottom1: null,
  bottom2: null,
  bottom3: null,
}

const userSigns = {
  first: 'X',
  second: 'O',
}

const users = { first: 'first', second: 'second' };

class GameController {
  root;
  gameHistory = defaultGameValues;
  currentUser = users.first;

  constructor(root) {
    this.root = root;
    this.generateDefaultTemplate();
    this.initHandlers();
  }

  checkVictory = () => {
    // do something !!!
  }

  setCurrentUser = (user) => {
    if (!user) {
      throw new Error('Setting of user without value unavalible!!!')
    }
    this.currentUser = user;
  }

  render = (fields = defaultGameValues) => {
    const newGameHTML = Object.keys(fields).reduce((total ,fieldName) =>
      `${fields[fieldName] ? this.createField(fieldName, fields[fieldName]) : this.createDefauldField(fieldName)} ${total}`
    , '');

    this.root.innerHTML = newGameHTML;
  }

  createField = (field = 'top1', user = null) => {
    return `<div class="game__field" data-game-id="${field}" data-user="${user || 'initial'}">${user ? userSigns[user] : ' '}</div>`
  }

  createDefauldField = (field = 'top1') => {
    return `<div class="game__field" data-game-id="${field}" data-user="initial"></div>`;
  }

  generateDefaultTemplate = () => {
    this.render(defaultGameValues);
  }

  addGameHistory = ({ user = users.first, field = 'top1' }) => {
    this.gameHistory[field] = user;
  }

  userMove = (field = 'top1') => {
    this.addGameHistory({ user: this.currentUser, field });

    this.render(this.gameHistory);
  }

  toggleUser = () => {
    this.setCurrentUser(this.currentUser === users.first ? users.second : users.first);
  }

  handleGameClick = (field = 'top1') => {
    this.toggleUser();
    this.userMove(field);
    this.checkVictory();
  }

  initHandlers = () => {
    this.root.addEventListener('click', (e) => {
      const field = e.target.dataset.gameId;
      this.handleGameClick(field);
    });
  }
}

const init = () => {
  const root = document.getElementById('game');

  const gameController = new GameController(root);

  // for debug of state
  window._gameController = gameController;
}

window.onload = init();
