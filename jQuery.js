$(document).ready(() => {
    let table_content = '';
    let model = '';

    $.ajax({
        url: "https://jsonplaceholder.typicode.com/comments/",
        type: "get",
        dataType: "json",
        success: (data) => {
            // Simulate delay using jQuery
            $("#table").html(`
                <caption>Comments Table  </caption>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Body</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody class="tbody" id="tbody">
                ${table_content}
                </tbody>
                `);


            $(".container").hide().delay(500).fadeIn(() => {
                data.forEach(row_data => {
                    let table_content = `
                    <tr>
                        <td>${row_data.name}</td>
                        <td>${row_data.email}</td>
                        <td>${row_data.body.slice(0, 10) +row_data.body.length>10?"...":""}</td>
                        <td><a class="btn btn-primary" href="#" role="button" data-bs-toggle="modal" data-bs-target="#${row_data.id}">View</a></td>
                    </tr>
                    `;

                    $(".tbody").append(table_content)
                    model += `
                    <div class="modal fade" id="${row_data.id}" tabindex="-1" aria-labelledby="modalLabel-${row_data.id}" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalLabel-${row_data.id}">${row_data.name}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <h6>${row_data.email}</h6>
                                    <p>${row_data.body}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                });

               

                $(".container").append(model);
        


                        $("#search-btn").on("keyup", function() {
                            let match = $(this).val().toLowerCase(); 
                            console.log(match);  
        
                            $("#table tbody tr").each(function() {
                                let rowText = $(this).text().toLowerCase(); 
                               
                                if (rowText.indexOf(match) === -1) {
                                    $(this).hide();  
                                } else {
                                    $(this).show();  
                                }
                            });
                        });
                    });
                }
            });
        });