import { useState } from "react";
import { RARIDADES } from "../data/opcoes";

// Formulário usado tanto para cadastrar quanto para editar uma criatura.
function PetForm({ petEmEdicao, onSalvar, onCancelar }) {
  const [nome, setNome] = useState(petEmEdicao?.nome || "");
  const [especie, setEspecie] = useState(petEmEdicao?.especie || "");
  const [energia, setEnergia] = useState(petEmEdicao?.energia ?? 50);
  const [personalidade, setPersonalidade] = useState(
    petEmEdicao?.personalidade || ""
  );
  const [raridade, setRaridade] = useState(
    petEmEdicao?.raridade || "Comum"
  );
  const [status, setStatus] = useState(
    petEmEdicao?.status || "Disponível"
  );
  const [imagem, setImagem] = useState(petEmEdicao?.imagem || "");
  const [erro, setErro] = useState("");

  // Verifica os dados e envia para o App salvar.
  function enviarFormulario(event) {
    event.preventDefault();

    if (!nome.trim() || !especie.trim() || !personalidade.trim()) {
      setErro("Preencha nome, espécie e personalidade.");
      return;
    }

    const energiaNumero = Number(energia);

    if (
      !Number.isFinite(energiaNumero) ||
      energiaNumero < 0 ||
      energiaNumero > 100
    ) {
      setErro("A energia deve estar entre 0 e 100.");
      return;
    }

    setErro("");

    onSalvar({
      nome: nome.trim(),
      especie: especie.trim(),
      energia: energiaNumero,
      personalidade: personalidade.trim(),
      raridade,
      status,
      imagem: imagem.trim() || "🐾",
    });
  }

  return (
    <form
      className={`formulario ${petEmEdicao ? "editando" : ""}`}
      onSubmit={enviarFormulario}
    >
      <h2>{petEmEdicao ? "Editar criatura" : "Nova criatura"}</h2>

      <div className="campos">
        <label className="campo">
          Nome
          <input
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </label>

        <label className="campo">
          Espécie
          <input
            value={especie}
            onChange={(event) => setEspecie(event.target.value)}
          />
        </label>

        <label className="campo">
          Personalidade
          <input
            value={personalidade}
            onChange={(event) => setPersonalidade(event.target.value)}
          />
        </label>

        <label className="campo">
          Energia (0 a 100)
          <input
            type="number"
            min="0"
            max="100"
            value={energia}
            onChange={(event) => setEnergia(event.target.value)}
          />
        </label>

        <label className="campo">
          Raridade
          <select
            value={raridade}
            onChange={(event) => setRaridade(event.target.value)}
          >
            {RARIDADES.map((opcao) => (
              <option key={opcao} value={opcao}>
                {opcao}
              </option>
            ))}
          </select>
        </label>

        <label className="campo">
          Status
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="Disponível">Disponível</option>
            <option value="Adotado">Adotado</option>
          </select>
        </label>

        <label className="campo">
          Imagem ou emoji
          <input
            value={imagem}
            onChange={(event) => setImagem(event.target.value)}
          />
        </label>
      </div>

      {erro && <p className="aviso erro">{erro}</p>}

      <div className="botoes-form">
        <button type="submit" className="botao">
          {petEmEdicao ? "Salvar alterações" : "Cadastrar"}
        </button>

        {petEmEdicao && (
          <button
            type="button"
            className="botao secundario"
            onClick={onCancelar}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default PetForm;