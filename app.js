$(function () {
  var notes = [
    { id: 1, title: "Buy milk", body: "Two litres" },
    { id: 2, title: "Call Sam", body: "About the trip" },
  ];

  function render() {
    var $list = $("#notes").empty();
    $.each(notes, function (_, note) {
      var $item = $("<li>").append($("<strong>").text(note.title));
      if (note.body) $item.append($("<span>").text(" — " + note.body));
      $item.append($("<button>").text("Delete").on("click", function () {
        notes = $.grep(notes, function (n) { return n.id !== note.id; });
        render();
      }));
      $list.append($item);
    });
    $("#count").text(notes.length + " notes");
  }

  $("#note-form").on("submit", function (event) {
    event.preventDefault();
    var title = $.trim($("#title").val());
    if (!title) return;
    var nextId = notes.reduce(function (max, n) { return Math.max(max, n.id); }, 0) + 1;
    notes.push({ id: nextId, title: title, body: "" });
    $("#title").val("");
    render();
  });

  render();
});
