// Componente = função que recebe "props" (dados de fora) e devolve JSX (a tela).
// Recebe UM objeto "pet" e duas funções do App: o cartão não altera a lista,
// só avisa o App que o usuário clicou em "Editar" ou "Remover".
function PetCard({ pet, onEditar, onRemover }) {
  // Se o status for "Disponível", usamos a classe CSS "disponivel"; senão "adotado".
  const classeStatus = pet.status === "Disponível" ? "disponivel" : "adotado";

  return (
    <article className={`card ${classeStatus}`}>
      <span className={`selo ${classeStatus}`}>{pet.status}</span>
      <div className="card-imagem">{pet.imagem}</div>
      <h3>{pet.nome}</h3>
      <p className="especie">{pet.especie}</p>
      <p className="detalhe">
        {pet.personalidade} · {pet.raridade}
      </p>
      <p className="detalhe">⚡ Energia: {pet.energia}</p>

      <div className="acoes">
        {/* () => onEditar(pet) cria uma função que só roda no clique. */}
        <button
          type="button"
          className="botao pequeno secundario"
          onClick={() => onEditar(pet)}
        >
          Editar
        </button>
        <button
          type="button"
          className="botao pequeno perigo"
          onClick={() => onRemover(pet)}
        >
          Remover
        </button>
      </div>
    </article>
  );
}

export default PetCard;