exports.handler = async function(event, context) {
    const boardName = event.queryStringParameters.name;
    const fetch = (await import('node-fetch')).default;
  
    const response = await fetch('https://api.trello.com/1/members/me/boards?key=dd7bf4715e4ca5669228d94955409032&token=ATTAb7eedc7858e02596fad54b0252055d307001f64a418bc35d3b48610e1d2c7588572BCBE4&response_type=token');
    const boards = await response.json();
  
    const board = boards.find(board => board.name === boardName);
  
    if (!board) {
      return {
        statusCode: 404,
        body: 'Board not found'
      };
    }
  
    const cardsResponse = await fetch(`https://api.trello.com/1/boards/${board.id}/cards?key=dd7bf4715e4ca5669228d94955409032&token=ATTAb7eedc7858e02596fad54b0252055d307001f64a418bc35d3b48610e1d2c7588572BCBE4&response_type=token`);
    const cards = await cardsResponse.json();
  
    const totalTickets = cards.length;
    const openTickets = cards.filter(card => !card.closed).length;
  
    return {
      statusCode: 200,
      body: JSON.stringify({ cards, totalTickets, openTickets })
    };
  };
  