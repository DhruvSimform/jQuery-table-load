$(document).ready(() => {
    const $container = $(".container");
    const $table = $("#table");
    const $searchBtn = $("#search-btn");
    let currentPage = 1;  // Corrected variable name
    let dataa = [];

    // Function to generate table content
    const generateTableContent = (data) => {
        return data.map(row_data => `
            <tr>
                <td>${row_data.name}</td>
                <td>${row_data.email}</td>
                <td>${row_data.body.length > 10 ? row_data.body.slice(0, 10) + "..." : row_data.body}</td>
                <td><a class="btn btn-primary view-btn" href="#" role="button" data-bs-toggle="modal" data-bs-target="#commentModal" data-id="${row_data.id}" data-name="${row_data.name}" data-email="${row_data.email}" data-body="${row_data.body}">View</a></td>
            </tr>
        `).join('');
    };

    // Function to render the table
    const renderTable = (tableContent) => {
        $table.html(`
            <caption>Comments Table</caption>
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Body</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody class="tbody" id="tbody">
                ${tableContent}
            </tbody>
        `);
    };

    // Function to generate modal content (only one modal)
    const generateModalContent = () => `
        <div class="modal fade" id="commentModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLabel">Comment Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h6 id="modal-email"></h6>
                        <p id="modal-body-text"></p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Function to show the container with fade-in effect
    const showContainer = () => {
        $container.hide().delay(500).fadeIn();
    };

    // Function to filter table rows based on search input
    const filterTableRows = (match) => {
        $("#table tbody tr").each(function() {
            const rowText = $(this).text().toLowerCase();
            $(this).toggle(rowText.indexOf(match) !== -1);
        });
    };

    // Function to update modal content when a 'View' button is clicked
    const updateModalContent = (name, email, body) => {
        $("#modalLabel").text(name);
        $("#modal-email").text(email);
        $("#modal-body-text").text(body);
    };

    const generatePage = (currentPage = 1) => {
        let maxRowInPage = 12;
        let pages = Math.ceil(dataa.length / maxRowInPage); // Fixed pages calculation

        let rowTop = (currentPage - 1) * maxRowInPage;  // Corrected index for pagination
        let rowDown = rowTop + maxRowInPage;

        console.log(rowTop, rowDown);

        const tableContent = generateTableContent(dataa.slice(rowTop, rowDown));
        renderTable(tableContent);
        $(".container").append(generateModalContent());
        showContainer();
    }

    // Fetch comments and handle response
    const fetchComments = () => {
        $.ajax({
            url: "https://jsonplaceholder.typicode.com/comments/",
            type: "get",
            dataType: "json",
            success: (data) => {
                dataa = data;
                generatePage(currentPage);
            },
            error: (xhr, status, error) => {
                console.error(`Error: ${status} - ${error}`);
                alert("Failed to load data. Please try again later.");
            }
        });
    };

    // Initializing the table and modal
    fetchComments();

    // Event listener for search functionality
    $searchBtn.on("keyup", function() {
        const match = $(this).val().toLowerCase();
        filterTableRows(match);
    });

    // Event delegation for dynamically added 'View' buttons
    $table.on("click", ".view-btn", function() {
        const name = $(this).data("name");
        const email = $(this).data("email");
        const body = $(this).data("body");

        updateModalContent(name, email, body);
    });
});
