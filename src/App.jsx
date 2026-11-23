import { useState } from "react";
import { petsIniciais } from "./data/pets";
import PetCard from "./components/PetCard";
import PetForm from "./components/PetForm";

function App() {
  // ESTADO: a lista de criaturas vive aqui. Quando mudar, a tela atualiza sozinha.
  const [pets, setPets] = useState(petsIniciais);

  // Criatura que está sendo editada (null = nenhuma, formulário em modo cadastro).
  const [petEmEdicao, setPetEmEdicao] = useState(null);

  // Mensagem de confirmação exibida na tela ("cadastrada", "atualizada"...).
  const [mensagem, setMensagem] = useState("");

  // Mostra uma mensagem e a apaga sozinha depois de 3 segundos.
  function avisar(texto) {
    setMensagem(texto);
    setTimeout(() => setMensagem(""), 3000);
  }

  // Chamada pelo formulário. Aqui decidimos: cadastro ou edição?
  function salvarPet(dados) {
    if (petEmEdicao) {
      // EDIÇÃO: map percorre a lista e troca só a criatura com o mesmo id.
      // { ...pet, ...dados } copia o pet e sobrescreve com os dados novos
      // (id e status continuam como estavam).
      setPets(
        pets.map((pet) =>
          pet.id === petEmEdicao.id ? { ...pet, ...dados } : pet
        )
      );
      setPetEmEdicao(null);
      avisar("Criatura atualizada com sucesso!");
    } else {
      // CADASTRO: cria a criatura completa e coloca no fim da lista.
      const novoPet = { ...dados, id: Date.now(), status: "Disponível" };
      setPets([...pets, novoPet]);
      avisar("Criatura cadastrada com sucesso!");
    }
  }

  // Chamada pelo botão "Editar" do cartão.
  function iniciarEdicao(pet) {
    setPetEmEdicao(pet);
    window.scrollTo({ top: 0, behavior: "smooth" }); // sobe até o formulário
  }

  // Chamada pelo botão "Remover" do cartão.
  function removerPet(pet) {
    // confirm abre a janelinha do navegador e devolve true (OK) ou false (Cancelar).
    const confirmou = window.confirm(
      `Remover ${pet.nome}? Esta ação não pode ser desfeita.`
    );
    if (!confirmou) return; // se cancelou, não faz nada

    // filter devolve um novo array só com as criaturas que NÃO têm esse id.
    setPets(pets.filter((p) => p.id !== pet.id));

    // Se a criatura removida estava aberta na edição, fecha o formulário.
    if (petEmEdicao && petEmEdicao.id === pet.id) {
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
        {/* key muda quando troca a criatura em edição. O React então recria o
            formulário do zero, já com os dados novos nos campos. */}
        <PetForm
          key={petEmEdicao ? petEmEdicao.id : "novo"}
          petEmEdicao={petEmEdicao}
          onSalvar={salvarPet}
          onCancelar={() => setPetEmEdicao(null)}
        />

        {mensagem && <p className="aviso sucesso">{mensagem}</p>}

        <h2>Minhas Criaturas</h2>

        {pets.length === 0 && <p>Nenhuma criatura cadastrada.</p>}

        <section className="lista">
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