
CREATE DATABASE desafio_evacopilot;

CREATE TABLE IF NOT EXISTS `desafio_evacopilot`.`colaborador` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome_colaborador` VARCHAR(75) NOT NULL,
  `matricula` VARCHAR(10) NOT NULL,
  `setor` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `matricula_UNIQUE` (`matricula` ASC) VISIBLE)
ENGINE = InnoDB;

ALTER USER 'Master'@'localhost' IDENTIFIED WITH mysql_native_password BY 'k9ug%`NV';
FLUSH PRIVILEGES;


INSERT INTO colaborador(nome_colaborador, matricula, setor, email) VALUES ("José Osorio", "435678", "Administrativo", "jose.administrativo@empresa.com");
INSERT INTO colaborador(nome_colaborador, matricula, setor, email) VALUES ("Luciano Golveia", "445678", "Financeiro", "luciano.financeiro@empresa.com");
INSERT INTO colaborador(nome_colaborador, matricula, setor, email) VALUES ("Marta Cunha", "455678", "Vendas", "marta.vendas@empresa.com");

SELECT nome_colaborador, matricula, setor FROM colaborador where id = '?';

