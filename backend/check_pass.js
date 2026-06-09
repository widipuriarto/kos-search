const bcrypt = require('bcryptjs');

const hash = '$2b$10$fzBmL9kVaFLHBuXamsKZt.YS5yXqrPS0PMp3iCSZPkQ3OnR2EDP8C';
const plain = 'rahasia_budi';

bcrypt.compare(plain, hash).then(res => console.log('Match?', res));
