import { useState } from "react";
import { RARIDADES } from "../data/opcoes.js";
import { validarPet } from "../utils/validarPet.js";

function PetForm({ petEmEdicao, onSalvar, onCancelar }) {
  const [nome, setNome] = useState(petEmEdicao?.nome ?? "");
  const [especie, setEspecie] = useState(petEmEdicao?.especie ?? "");
  const [energia, setEnergia] = useState(petEmEdicao?.energia ?? 50);
  const [personalidade, setPersonalidade] = useState(
    petEmEdicao?.personalidade ?? ""
  );
  const [raridade, setRaridade] = useState(petEmEdicao?.raridade ?? "Comum");
  const [status, setStatus] = useState(petEmEdicao?.status ?? "Disponível");
  const [imagem, setImagem] = useState(petEmEdicao?.imagem ?? "");
  const [erro, setErro] = useState("");

  function enviarFormulario(event) {
    event.preventDefault();

    const dados = { nome, especie, personalidade, energia };
    const mensagemErro = validarPet(dados);

    if (mensagemErro) {
      setErro(mensagemErro);
      return;
    }

    setErro("");
    onSalvar({
      nome: nome.trim(),
      especie: especie.trim(),
      personalidade: personalidade.trim(),
      energia: Number(energia),
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
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            maxLength={60}
            required
          />
        </label>

        <label className="campo">
          Espécie
          <input
            type="text"
            value={especie}
            onChange={(event) => setEspecie(event.target.value)}
            maxLength={60}
            required
          />
        </label>

        <label className="campo">
          Personalidade
          <input
            type="text"
            value={personalidade}
            onChange={(event) => setPersonalidade(event.target.value)}
            maxLength={60}
            required
          />
        </label>

        <label className="campo">
          Energia (0 a 100)
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            value={energia}
            onChange={(event) => setEnergia(event.target.value)}
            required
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
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="Disponível">Disponível</option>
            <option value="Adotado">Adotado</option>
          </select>
        </label>

        <label className="campo">
          Imagem (URL) ou emoji
          <input
            type="text"
            value={imagem}
            onChange={(event) => setImagem(event.target.value)}
            maxLength={300}
          />
        </label>
      </div>

      {erro && <p className="aviso erro" role="alert">{erro}</p>}

      <div className="botoes-form">
        <button type="submit" className="botao">
          {petEmEdicao ? "Salvar alterações" : "Cadastrar"}
        </button>

        {petEmEdicao && (
          <button type="button" className="botao secundario" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default PetForm;
