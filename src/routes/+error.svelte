<script>
    import { goto } from '$app/navigation';

   </script>
   
   <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold">404 - Page Not Found</h1>
    <p class="mt-4">The page you're looking for doesn't exist.</p>
    <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded" on:click={() => goto('/home')}>Go Home</button>
   </div>