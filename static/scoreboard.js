function display_scoreboard(scoreboard){
  $("#teams").empty();
  $.each(scoreboard, function(index, team){
    addTeamView(team.id, team.name, team.score);
  });
}

function addTeamView(id, name, score){
  var team_template = $("<div class = 'row'></div>");
  var name_template = $("<div class = 'col-md-5'></div>");
  var score_template = $("<div class='col-md-2' id='team-score-" + id + "'></div>");
  var button_template = $("<div class = 'col-md-2'></div>");
  var increase_button = $("<button class = 'increase-button'>+</button>");
  $(increase_button).click(function(){
    increase_score(id);
  });
  name_template.text(name);
  score_template.text(score);
  button_template.append(increase_button);
  team_template.append(name_template);
  team_template.append(score_template);
  team_template.append(button_template);
  $("#teams").append(team_template);
}

function increase_score(id){
  var team_id = {"id": id}
  $.ajax({
    type: "POST",
    url: "increase_score",                
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data : JSON.stringify(team_id),
    success: function(result){
      
      display_scoreboard(result.scoreboard);
      
      var updatedTeam = result.scoreboard.find(team => team.id === id);
      
      if (updatedTeam) {
        // Update the score in the DOM
        $("#team-score-" + id).text(updatedTeam.score);
      }
    },
    error: function(request, status, error){
        console.log("Error");
        console.log(request)
        console.log(status)
        console.log(error)
    }
  });
}

$(document).ready(function(){
  display_scoreboard(scoreboard);
})
