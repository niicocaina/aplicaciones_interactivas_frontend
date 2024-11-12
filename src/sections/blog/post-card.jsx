import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function PostCard({ post }) {
  const { cover, title, author, email } = post; 

  return (
    <Card sx={{ display: 'flex', p: 2, maxWidth: 600, width: '100%' }}>
      <Box sx={{ position: 'relative', width: 120, height: 120 }}>
        {/* Avatar */}
        <Avatar
          alt={author.name}
          src={author.avatarUrl}
          sx={{ width: 120, height: 120, borderRadius: '50%' }}
        />
      </Box>
      <Box sx={{ ml: 3, flex: 1 }}>
        {/* Título y datos */}
        <Typography variant="h6" component="h2">
          {author.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {email} {/* Mostramos el email del usuario */}
        </Typography>

        {/* Otros detalles opcionales */}
        <Typography variant="body2" sx={{ mt: 1 }}>
          {title}
        </Typography>
      </Box>
    </Card>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    cover: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
    email: PropTypes.string.isRequired, 
  }).isRequired,
};
