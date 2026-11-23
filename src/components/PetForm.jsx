import { useState } from "react";
import { RARIDADES } from "../data/opcoes";

// Valores iniciais do formulário. Também usamos para "limpar" depois de cadastrar.
const formularioVazio = {
  nome: "",
  especie: "",
  personalidade: "",
  raridade: "Comum",
  energia: 100,
  imagem: "",
};

// "onAdicionar" é uma função que vem do App (props). O formulário não mexe
// na lista; ele só avisa o App: "cadastre esta criatura".
function PetForm({ onAdicionar }) {
  // Cada campo é um "input controlado": o valor mostrado vem do estado "form".
  const [form, setForm] = useState(formularioVazio);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  // Roda a cada tecla digitada. O "name" do campo diz qual propriedade mudar.
  function handleChange(evento) {
    const { name, value } = evento.target;
    setForm({ ...form, [name]: value });
    setErro("");
    setSucesso("");
  }

  function handleSubmit(evento) {
    evento.preventDefault(); // impede a página de recarregar ao enviar

    // Validação 1: campos obrigatórios não podem ficar vazios.
    if (
      !form.nome.trim() ||
      !form.especie.trim() ||
      !form.personalidade.trim()
    ) {
      setErro("Preencha nome, espécie e personalidade.");
      return;
    }

    // Validação 2: energia precisa ser um número de 0 a 100.
    const energia = Number(form.energia);
    if (form.energia === "" || Number.isNaN(energia) || energia < 0 || energia > 100) {
      setErro("A energia deve ser um número entre 0 e 100.");
      return;
    }

    onAdicionar({
      nome: form.nome.trim(),
      especie: form.especie.trim(),
      personalidade: form.personalidade.trim(),
      raridade: form.raridade,
      energia,
      imagem: form.imagem.trim() || "🐾", // se vazio, usa uma imagem padrão
    });

    setForm(formularioVazio);
    setSucesso("Criatura cadastrada com sucesso!");
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>Nova criatura</h2>

      <div className="campos">
        <label className="campo">
          Nome *
          <input name="nome" value={form.nome} onChange={handleChange} />
        </label>

        <label className="campo">
          Espécie *
          <input name="especie" value={form.especie} onChange={handleChange} />
        </label>

        <label className="campo">
          Personalidade *
          <input
            name="personalidade"
            value={form.personalidade}
            onChange={handleChange}
          />
        </label>

        <label className="campo">
          Raridade
          <select name="raridade" value={form.raridade} onChange={handleChange}>
            {RARIDADES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        <label className="campo">
          Energia (0 a 100)
          <input
            name="energia"
            type="number"
            value={form.energia}
            onChange={handleChange}
          />
        </label>

        <label className="campo">
          Imagem (emoji)
          <input name="imagem" value={form.imagem} onChange={handleChange} />
        </label>
      </div>

      {erro && <p className="aviso erro">{erro}</p>}
      {sucesso && <p className="aviso sucesso">{sucesso}</p>}

      <button type="submit" className="botao">
        Cadastrar
      </button>
    </form>
  );
}

export default PetForm;