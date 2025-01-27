$(document).ready(() => {


    let table_content = '';
    let model = ""
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/comments/",
        type: "get",
        dataType: "json",


        success: (data) => {
            console.log(data);

            data.forEach(row_data => {
                table_content += `
                
                <tr>
                  
                    <td>${row_data.name}</td>
                    <td>${row_data.email}</td>
                    <td>${row_data.body.slice(0,10)+"..."}</td>
                    <td><a class="btn btn-primary" href="#" role="button" data-bs-toggle="modal" data-bs-target="#${row_data.id}">View</a></td>
                 
                `
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

                `
            }
            );

            $("#table").html(`
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
        $(".container").append(model);


        }
    })










});
