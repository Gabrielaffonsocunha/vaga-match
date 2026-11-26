# VagaMatch

Ferramenta demonstrativa em TypeScript para comparar currículo e descrição de vaga. A análise acontece no navegador, sem enviar ou salvar os textos.

## O que faz

- Identifica competências de um catálogo local em ambos os textos.
- Calcula uma estimativa transparente de cobertura: competências reconhecidas no currículo divididas pelas competências reconhecidas na vaga.
- Separa competências encontradas e requisitos para revisar.
- Permite baixar um resumo da análise em `.txt`.
- Limpa os campos sem persistir os dados no navegador.
- Inclui conteúdo fictício para experimentar a interface.

## O que não faz

O percentual **não é uma nota de ATS** nem uma previsão de aprovação. O catálogo cobre um conjunto limitado de termos e não avalia contexto, senioridade, resultados, sinônimos fora do catálogo ou requisitos implícitos. Uma competência marcada como ausente pode estar descrita no currículo com outras palavras.

Use as sugestões para revisar seu texto. Inclua uma competência somente se ela corresponder à sua experiência real.

## Executar localmente

Requisitos: Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Para gerar os arquivos estáticos:

```bash
npm run build
npm run preview
```

## Como a análise funciona

O catálogo de competências está em `src/main.ts`. O texto é normalizado para ignorar diferenças entre maiúsculas, minúsculas e acentos. A ferramenta procura aliases conhecidos e calcula a cobertura apenas entre os termos reconhecidos na descrição da vaga. O algoritmo roda no cliente e não usa uma API de IA.

## Privacidade

Os campos não são enviados para um servidor, não são gravados em `localStorage` e são removidos ao limpar a página. A ferramenta funciona inteiramente no navegador depois que os arquivos do projeto são carregados. O relatório baixado é gerado localmente.

## Tecnologias

- TypeScript com `strict` e verificações de compilação
- Vite para desenvolvimento e build
- HTML semântico e CSS responsivo, sem framework de interface

## Limites do protótipo

- O catálogo de competências é pequeno e editável no código.
- Não importa PDF ou DOCX; cole o texto manualmente.
- A análise é lexical e não interpreta o significado das frases.
- Os exemplos de currículo e vaga são fictícios.

## Autor

Gabriel Affonso Cunha — projeto de portfólio em desenvolvimento web com TypeScript.
