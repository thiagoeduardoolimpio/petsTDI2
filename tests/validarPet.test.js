import test from "node:test";
import assert from "node:assert/strict";
import { validarPet } from "../src/utils/validarPet.js";

const dadosValidos = {
  nome: "Nix",
  especie: "Gato",
  personalidade: "Calmo",
  energia: "50",
};

test("aceita dados válidos e os limites de energia", () => {
  assert.equal(validarPet(dadosValidos), "");
  assert.equal(validarPet({ ...dadosValidos, energia: "0" }), "");
  assert.equal(validarPet({ ...dadosValidos, energia: 100 }), "");
});

test("rejeita campos obrigatórios vazios ou com espaços", () => {
  assert.match(validarPet({ ...dadosValidos, nome: "   " }), /Preencha/);
  assert.match(validarPet({ ...dadosValidos, especie: "" }), /Preencha/);
  assert.match(validarPet({ ...dadosValidos, personalidade: "\t" }), /Preencha/);
});

test("rejeita energia vazia, inválida ou fora do intervalo", () => {
  const valoresInvalidos = ["", "   ", "abc", "-1", "101", "Infinity", undefined, null];

  for (const energia of valoresInvalidos) {
    assert.match(validarPet({ ...dadosValidos, energia }), /energia/i);
  }
});
