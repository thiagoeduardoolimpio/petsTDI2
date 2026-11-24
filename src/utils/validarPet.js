export function validarPet(dados = {}) {
  const {
    nome = "",
    especie = "",
    personalidade = "",
    energia,
  } = dados ?? {};

  if (!nome.trim() || !especie.trim() || !personalidade.trim()) {
    return "Preencha nome, espécie e personalidade.";
  }

  const energiaVazia =
    energia === null ||
    energia === undefined ||
    (typeof energia === "string" && energia.trim() === "");
  const energiaNumero = Number(energia);

  if (
    energiaVazia ||
    !Number.isFinite(energiaNumero) ||
    energiaNumero < 0 ||
    energiaNumero > 100
  ) {
    return "A energia deve estar entre 0 e 100.";
  }

  return "";
}
