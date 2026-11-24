import { useEffect, useRef, useState } from "react";
import { petsIniciais } from "./data/pets.js";
import PetCard from "./components/PetCard.jsx";
import PetForm from "./components/PetForm.jsx";

function gerarId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

function App() {
  const [pets, setPets] = useState(petsIniciais);
  const [petEmEdicao, setPetEmEdicao] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const timerMensagem = useRef(null);

  // Cancela o aviso anterior para não apagar uma mensagem mais recente.
  function avisar(texto) {
    setMensagem(texto);
    clearTimeout(timerMensagem.current);
    timerMensagem.current = setTimeout(() => setMensagem(""), 3000);
  }

  useEffect(() => {
    return () => clearTimeout(timerMensagem.current);
  }, []);

  function salvarPet(dados) {
    if (petEmEdicao) {
      setPets((lista) =>
        lista.map((pet) =>
          pet.id === petEmEdicao.id ? { ...pet, ...dados } : pet
        )
      );
      setPetEmEdicao(null);
      avisar("Criatura atualizada com sucesso!");
      return;
    }

    setPets((lista) => [...lista, { ...dados, id: gerarId() }]);
    avisar("Criatura cadastrada com sucesso!");
  }

  function iniciarEdicao(pet) {
    setPetEmEdicao(pet);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function removerPet(pet) {
    const confirmou = window.confirm(
      `Remover ${pet.nome}? Esta ação não pode ser desfeita.`
    );

    if (!confirmou) return;

    setPets((lista) => lista.filter((item) => item.id !== pet.id));

    if (petEmEdicao?.id === pet.id) {
      setPetEmEdicao(null);
    }

    avisar(`${pet.nome} foi removido da lista.`);
  }

  return (
    <div className="app">
      <header className="topo">
        <h1>PixelPet Rescue</h1>
        <p>Adotar · Cuidar · Explorar</p>
      </header>

      <main>
        <PetForm
          key={petEmEdicao?.id ?? "novo"}
          petEmEdicao={petEmEdicao}
          onSalvar={salvarPet}
          onCancelar={() => setPetEmEdicao(null)}
        />

        {mensagem && (
          <p className="aviso sucesso" role="status" aria-live="polite">
            {mensagem}
          </p>
        )}

        <h2>Minhas Criaturas</h2>

        {pets.length === 0 && <p>Nenhuma criatura cadastrada.</p>}

        <section className="lista" aria-label="Lista de criaturas">
          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              onEditar={iniciarEdicao}
              onRemover={removerPet}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
