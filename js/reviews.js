document.addEventListener('DOMContentLoaded', function() {
    let reviewForm = document.getElementById('review-form');

    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const movieName = document.getElementById('movie-name').value;
            const userName = document.getElementById('user-name').value;
            const description = document.getElementById('description').value;

            document.getElementById('modal-movie-name').textContent = movieName;
            document.getElementById('modal-user-name').textContent = userName;
            document.getElementById('modal-description').textContent = description;

            const modal = new bootstrap.Modal(document.getElementById('review-modal'));
            modal.show()
        });
    }
});

function updateReview() {
    $('#review-modal').modal('show');
}

function deleteReview() {
    const reviewList = document.getElementById('reviews-list');
    reviewList.removeChild(reviewList.childNodes[0]);
}