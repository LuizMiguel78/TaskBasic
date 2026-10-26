// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
<script>
    $(document).ready(function () {
        // Busca os dados da controller (Endpoint JSON)
        $.ajax({
            url: '/Tarefa/ObterTodas', // Ajuste para a sua rota de API/Controller
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                let linhas = '';

                $.each(data, function (index, item) {
                    // Trata propriedades nulas ou não formatadas
                    let funcionarioNome = item.funcionario ? item.funcionario.nome : '';
                    let dataPlanejada = item.dataPlanejada ? new Date(item.dataPlanejada).toLocaleDateString() : '';
                    let dataIniciada = item.dataIniciada ? new Date(item.dataIniciada).toLocaleDateString() : '';
                    let dataFinalizada = item.dataFinalizada ? new Date(item.dataFinalizada).toLocaleDateString() : '';
                    let dataCancelada = item.dataCancelada ? new Date(item.dataCancelada).toLocaleDateString() : '';

                    linhas += `
                    <tr>
                        <td>${item.descricao || ''}</td>
                        <td>${dataPlanejada}</td>
                        <td>${dataIniciada}</td>
                        <td>${dataFinalizada}</td>
                        <td>${dataCancelada}</td>
                        <td>${item.statusTarefa || ''}</td>
                        <td>${item.prazo || ''}</td>
                        <td>${funcionarioNome}</td>
                        <td>
                            <a href="/Tarefa/Edit/${item.codigo}">Edit</a> |
                            <a href="/Tarefa/Details/${item.codigo}">Details</a> |
                            <a href="/Tarefa/Delete/${item.codigo}">Delete</a>
                        </td>
                    </tr>
                `;
                });

                // Insere as linhas geradas na tabela
                $('#tabela-tarefas').html(linhas);
            },
            error: function (error) {
                console.error('Erro ao carregar tarefas:', error);
            }
        });
});
</script>
