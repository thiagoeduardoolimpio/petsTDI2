import { useState } from "react";
import { petsIniciais } from "./data/pets";
import PetCard from "./components/PetCard";
import PetForm from "./components/PetForm";

function App() {
  // ESTADO: a lista de criaturas vive aqui. Quando mudar, a tela atualiza sozinha.
  // useState devolve [valorAtual, funçãoParaAlterar].
  const [pets, setPets] = useState(petsIniciais);

  // Recebe os dados do formulário e cria a criatura completa.
  // id: Date.now() gera um número único (milissegundos desde 1970).
  // status: toda criatura nova começa como "Disponível".
  function adicionarPet(dados) {
    const novoPet = { ...dados, id: Date.now(), status: "Disponível" };
    // Nunca alteramos o array antigo: criamos um novo com [...pets, novoPet].
    setPets([...pets, novoPet]);
  }

  return (
    <div className="app">
      <header className="topo">
        <h1>PixelPet Rescue</h1>
        <p>Adotar · Cuidar · Explorar</p>
      </header>

      <main>
        <PetForm onAdicionar={adicionarPet} />

        <h2>Minhas Criaturas</h2>

        {/* .map percorre o array e devolve um <PetCard> para cada criatura.
            "key" ajuda o React a saber qual item é qual — use sempre o id. */}
        <section className="lista">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;