import { useState } from "react";
import { petsIniciais } from "./data/pets";
import PetCard from "./components/PetCard";

function App() {
  // ESTADO: a lista de criaturas vive aqui. Quando mudar, a tela atualiza sozinha.
  // useState devolve [valorAtual, funçãoParaAlterar].
  const [pets, setPets] = useState(petsIniciais);

  return (
    <div className="app">
      <header className="topo">
        <h1>PixelPet Rescue</h1>
        <p>Adotar · Cuidar · Explorar</p>
      </header>

      <main>
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