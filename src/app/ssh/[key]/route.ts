const sshKeys: { [key: string]: string } = {
  default:
    "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCuVdExXgh/jeoJS1T844gDKkHZ9WdpqOtIv1Ggxavcl61RsP5mYPIf4OmNHEQeTRkaen9ZC41V5XOH33rOzOs0x4/wJBb6LpnnMVi/PwZR4b544RQRsCfcoM7v9sUalLi/r2qeDTqQEXh8DaHIA7EHvps4qsGjs9KeRpuQJeHQMJnkUtT6yWX/8OILtjXmPB6HQgzCeA7oua+4uOVka8BpVcGeFvcnVEEe04q8I3qffO7v9nM6MkfIwk3qMYhuhv/BkoLIZEP+K07ExIZsaGm21wLLX3HXLfpx+bHLD7Vl3vhkVYyCPfztPVZ0z0mQZJqsPFoFWf1q4jAAezLUuSCj",
  unito:
    "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDnXF/AJxGwtIQcMmUcD6kaN4aoQUsk4a4tLRU22VMbPoa2yAogdgB56NCtlnT3dC5kPBQHfY2Vk+sCcReQaTDlbO22l3joI2TzFjyByaXoYm4BL6O6AFdb4W+cB8hI2yqy9sysSsTYoDjN9+l2SjeNicf+sa4IZlhtBgk9RVN5Gi8JIDmq18tVTbC9u/zpeG9yBqJfva5hCeSazWp8AvlIkToVXF2eWJOgr44PYbK3LpvO3GLCh+QaK8WBGWXyvqug2xGAJNmR9yKHObIYM5RwzlUXDDr7N8btIlzpYqOulpOJEUo3YwxsndDDJERQMwMfaR3zTVNFCPUd40fwQRcX",
};

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: { key: string };
  }
) {
  return new Response(sshKeys[params.key] || sshKeys.default);
}
