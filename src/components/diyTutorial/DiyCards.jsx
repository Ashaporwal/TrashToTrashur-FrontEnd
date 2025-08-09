
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

function DiyCards() {
  return (
    <>
      <div>
        <Card sx={{ width: 320, maxWidth: '100%', marginTop: "20px", marginLeft: "20px", boxShadow: 'lg', height: "400px" }}>
          <CardOverflow>
           <AspectRatio sx={{ minWidth: 200 }}>
              <img
                src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
                srcSet="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x"
                loading="lazy"
                alt=""
              />
            </AspectRatio>
          </CardOverflow>
            
            <Typography level="body-xs">Bluetooth Headset</Typography>
            <Link
              href="#product-card"
              color="neutral"
              textColor="text.primary"
              overlay
              endDecorator={<ArrowOutwardIcon />}
              sx={{ fontWeight: 'md' }}
            >
              Super Rockez A400
            </Link>
<Typography
              level="title-lg"
              sx={{ mt: 1, fontWeight: 'xl' }}
              endDecorator={
                <Chip component="span" size="sm" variant="soft" color="success">
                  Lowest price
                </Chip>
              }
            ></Typography>
            2,900 THB
        
            <Typography level="body-sm">
              (Only <b>7</b> left in stock!)
            </Typography>
          <CardOverflow>
            <Button 
              variant="solid" 
              sx={{ backgroundColor: '#1F6F78', color: 'white', '&:hover': { backgroundColor: '#165B61' } }} 
              size="lg"
            >
              Add to cart
            </Button>
          </CardOverflow>
        </Card>
         </div>
    </>
  );
}
export default DiyCards;












// function DiyCards(){

// return <>
// <div>
//       <Card sx={{ width: 320, maxWidth: '100%',marginTop:"20px",marginLeft:"20px", boxShadow: 'lg' ,height:"400px"}}>
//       <CardOverflow>
//         <AspectRatio sx={{ minWidth: 200 }}>
//           <img
//             src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
//             srcSet="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x"
//             loading="lazy"
//             alt=""
//           />
//         </AspectRatio>
//       </CardOverflow>
//       <CardContent>
//         <Typography level="body-xs">Bluetooth Headset</Typography>
//         <Link
//           href="#product-card"
//           color="neutral"
//           textColor="text.primary"
//           overlay
//           endDecorator={<ArrowOutwardIcon />}
//           sx={{ fontWeight: 'md' }}
//         >
//           Super Rockez A400
//         </Link>

//         <Typography
//           level="title-lg"
//           sx={{ mt: 1, fontWeight: 'xl' }}
//           endDecorator={
//             <Chip component="span" size="sm" variant="soft" color="success">
//               Lowest price
//             </Chip>
//           }
//         >
//           2,900 THB
//         </Typography>
//         <Typography level="body-sm">
//           (Only <b>7</b> left in stock!)
//         </Typography>
//       </CardContent>
//       <CardOverflow>
//         <Button variant="solid" color="danger" size="lg">
//           Add to cart
//         </Button>
//       </CardOverflow>
//     </Card>
// </div>
// </>


// }
// export default DiyCards;